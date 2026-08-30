import { getAlphabetById } from '../data/registry';
import { useCycleProgress } from '../store/useCycleProgress';

export function getNextDestination(alphabetId: string) {
  const alphabet = getAlphabetById(alphabetId);
  if (!alphabet) return { pathname: '/quiz', params: { alphabetId } };

  const introducedCount = useCycleProgress.getState().getIntroducedCount(alphabetId);

  // Première visite sur un alphabet avec instructions de saisie spécifiques (ex: hittite).
  if (introducedCount === 0 && alphabet.tutorialKey) {
    return { pathname: '/tutorial', params: { alphabetId } };
  }

  // Tous les cycles ont été présentés au moins une fois -> pratique libre.
  if (introducedCount >= alphabet.entries.length) {
    return { pathname: '/quiz', params: { alphabetId } };
  }

  // Sinon, présenter le prochain cycle non encore vu.
  return { pathname: '/learn', params: { alphabetId, cycleStart: String(introducedCount) } };
}