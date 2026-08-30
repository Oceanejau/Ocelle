export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase();
}

export function checkAnswer(expected: string, given: string): boolean {
  return normalizeAnswer(expected) === normalizeAnswer(given);
}