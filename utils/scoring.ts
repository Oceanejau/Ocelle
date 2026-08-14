import { AnswerRecord } from '../data/types';

// Pondère les réponses récentes plus fortement que les anciennes,
// et pénalise le nombre d'essais nécessaires pour trouver la bonne réponse.
export function computeWeightedSuccessRate(records: AnswerRecord[]): number {
  if (records.length === 0) return 0;

  const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp);
  let weightedSum = 0;
  let weightTotal = 0;

  sorted.forEach((record, index) => {
    const recencyWeight = (index + 1) / sorted.length;
    const attemptsPenalty = 1 / record.attempts;
    const score = record.correct ? attemptsPenalty : 0;
    weightedSum += score * recencyWeight;
    weightTotal += recencyWeight;
  });

  return Math.round((weightedSum / weightTotal) * 100);
}
