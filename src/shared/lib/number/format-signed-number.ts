/**
 * Formats a number with an explicit plus or minus sign while keeping zero neutral.
 * Useful for compact deltas in summaries, balances, and grouped totals.
 *
 * @example
 * formatSignedNumber(12); // "+12"
 * formatSignedNumber(-7); // "−7"
 * formatSignedNumber(0); // "0"
 */
export const formatSignedNumber = (value: number): string => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value)}`;
