import { useMemo, useRef, useState } from 'react';
import { AlphabetDefinition, getEntryAnswer, getEntryChar } from '../data/types';
import { useProgress } from '../store/useProgress';
import { useDailyChallenges } from '../store/useDailyChallenges';
import { useXp } from '../store/useXp';
import { checkAnswer } from '../utils/validators';
import { pickNextIndex } from '../utils/quizOrder';
import { computeLevel } from '../utils/xp';
import { MASTERY_THRESHOLD, MASTERY_XP_REWARD } from '../utils/mastery';

type FeedbackState = 'idle' | 'correct' | 'incorrect';

export function useQuizSession(
  alphabet: AlphabetDefinition,
  autoCheck: boolean,
  forceRandom: boolean
) {
  const { recordAnswer, getKnownCharCount } = useProgress();

  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>('idle');

  const attemptsRef = useRef(0);
  const startedAtRef = useRef(Date.now());
  const submittingRef = useRef(false);

  const entry = useMemo(
    () => alphabet.entries[index],
    [alphabet, index]
  );

  const tutorialDone =
    getKnownCharCount(alphabet.id) >= alphabet.entries.length;

  const isRandom = forceRandom || tutorialDone;

  function goToNext() {
    attemptsRef.current = 0;
    startedAtRef.current = Date.now();

    setInputValue('');
    setFeedback('idle');

    setIndex((prev) =>
      pickNextIndex(prev, alphabet.entries.length, isRandom)
    );

    submittingRef.current = false;
  }

  async function submitAnswer(answer?: string) {
    if (submittingRef.current) {
      return;
    }

    const answerToCheck = answer ?? inputValue;

    if (!answerToCheck.trim()) {
      return;
    }

    submittingRef.current = true;

    attemptsRef.current += 1;

    const isCorrect = checkAnswer(
      getEntryAnswer(entry),
      answerToCheck
    );

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    await recordAnswer({
      alphabetId: alphabet.id,
      char: getEntryChar(entry),
      correct: isCorrect,
      attempts: attemptsRef.current,
      responseTimeMs: Date.now() - startedAtRef.current,
      timestamp: Date.now(),
    });

    if (isCorrect) {
      const level = computeLevel(useXp.getState().totalXp);

      await useDailyChallenges
        .getState()
        .recordCorrectChar(
          alphabet.id,
          getEntryChar(entry),
          level
        );

      const successRate =
        useProgress.getState().getSuccessRate(alphabet.id);

      if (successRate >= MASTERY_THRESHOLD) {
        await useXp
          .getState()
          .awardXp(
            MASTERY_XP_REWARD,
            `mastery-${alphabet.id}`
          );
      }

      setTimeout(goToNext, 500);
    } else {
      // Permet une nouvelle tentative
      submittingRef.current = false;
    }
  }

  function handleChangeText(text: string) {
    setInputValue(text);

    if (
      autoCheck &&
      checkAnswer(getEntryAnswer(entry), text)
    ) {
      // IMPORTANT :
      // on passe directement "text" à submitAnswer()
      // au lieu d'attendre que inputValue soit mis à jour.
      submitAnswer(text);
    }
  }

  return {
    entry,
    inputValue,
    feedback,
    handleChangeText,
    submitAnswer,
    isRandom,
  };
}

