import { useMemo, useRef, useState } from 'react';
import { QuizEntry, getEntryAnswer, getEntryChar } from '../data/types';
import { useProgress } from '../store/useProgress';
import { useDailyChallenges } from '../store/useDailyChallenges';
import { useXp } from '../store/useXp';
import { checkAnswer } from '../utils/validators';
import { pickNextIndex } from '../utils/quizOrder';
import { computeLevel } from '../utils/xp';
import { MASTERY_THRESHOLD, MASTERY_XP_REWARD } from '../utils/mastery';

type FeedbackState = 'idle' | 'correct' | 'incorrect';

export function useQuizSession(
  alphabetId: string,
  entries: QuizEntry[],
  autoCheck: boolean,
  forceRandom: boolean
) {
  const { recordAnswer, hasAnsweredCorrectly } = useProgress();
  const [index, setIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const attemptsRef = useRef(0);
  const startedAtRef = useRef(Date.now());

  const entry = useMemo(() => entries[index], [entries, index]);
  const tutorialDone = entries.every((e) => hasAnsweredCorrectly(alphabetId, getEntryChar(e)));
  const isRandom = forceRandom || tutorialDone;

  function goToNext() {
    attemptsRef.current = 0;
    startedAtRef.current = Date.now();
    setInputValue('');
    setFeedback('idle');
    setQuestionNumber((n) => n + 1);
    setIndex((prev) => pickNextIndex(prev, entries.length, isRandom));
  }

  async function evaluateAnswer(givenValue: string) {
    attemptsRef.current += 1;
    const isCorrect = checkAnswer(getEntryAnswer(entry), givenValue);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    await recordAnswer({
      alphabetId,
      char: getEntryChar(entry),
      correct: isCorrect,
      attempts: attemptsRef.current,
      responseTimeMs: Date.now() - startedAtRef.current,
      timestamp: Date.now(),
    });

    if (isCorrect) {
      const level = computeLevel(useXp.getState().totalXp);
      await useDailyChallenges.getState().recordCorrectChar(alphabetId, getEntryChar(entry), level);

      const successRate = useProgress.getState().getSuccessRate(alphabetId);
      if (successRate >= MASTERY_THRESHOLD) {
        await useXp.getState().awardXp(MASTERY_XP_REWARD, `mastery-${alphabetId}`);
      }

      setTimeout(goToNext, 500);
    }
  }

  function submitAnswer() {
    evaluateAnswer(inputValue);
  }

  function handleChangeText(text: string) {
    setInputValue(text);
    if (autoCheck && checkAnswer(getEntryAnswer(entry), text)) {
      evaluateAnswer(text);
    }
  }

  return { entry, inputValue, feedback, handleChangeText, submitAnswer, isRandom, questionNumber };
}