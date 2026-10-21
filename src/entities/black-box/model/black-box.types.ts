import type { BlackBoxAnswer, BlackBoxInboxCounts, BlackBoxProfile, BlackBoxQuestion, BlackBoxResponder, BlackBoxStatus } from "@/services/api/bonuts-api";

export type TBlackBoxQuestion = BlackBoxQuestion;
export type TBlackBoxAnswer = BlackBoxAnswer;
export type TBlackBoxProfile = BlackBoxProfile;
export type TBlackBoxResponder = BlackBoxResponder;
export type TBlackBoxStatus = BlackBoxStatus;
export type TBlackBoxInboxCounts = BlackBoxInboxCounts;

/** Mirrors BlackBoxQuestion statuses on the backend. */
export enum BlackBoxQuestionStatus {
	Pending = "pending",
	Published = "published",
}
