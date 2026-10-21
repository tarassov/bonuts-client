/** Mirror BlackBoxQuestion::TEXT_LENGTH and ::ANSWER_LENGTH on the backend. */
export const QUESTION_MIN_LENGTH = 12;
export const ANSWER_MIN_LENGTH = 8;
export const TEXT_MAX_LENGTH = 2000;

export const isQuestionLongEnough = (text: string): boolean => text.trim().length >= QUESTION_MIN_LENGTH;

export const isAnswerLongEnough = (text: string): boolean => text.trim().length >= ANSWER_MIN_LENGTH;
