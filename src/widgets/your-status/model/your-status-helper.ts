import type { GetParticipationCurrentWeekApiResponse } from "@/services/api/bonuts-api";

export type TStatusTone = "primary" | "secondary" | "warning" | "success";
export type TParticipationSuggestion = GetParticipationCurrentWeekApiResponse["suggestions"][number];

const STATUS_SCORE_THRESHOLDS = {
	// Weekly score comes from `weekly_score_scaled`; these thresholds match
	// the current backend bucket boundaries for status tone mapping.
	secondary: 40,
	warning: 120,
	success: 240,
} as const;

const MAX_SUGGESTIONS = 2;

export function getStatusTone(weeklyScore: number, isHighestBucketReached: boolean): TStatusTone {
	if (isHighestBucketReached || weeklyScore >= STATUS_SCORE_THRESHOLDS.success) return "success";
	if (weeklyScore >= STATUS_SCORE_THRESHOLDS.warning) return "warning";
	if (weeklyScore >= STATUS_SCORE_THRESHOLDS.secondary) return "secondary";

	return "primary";
}

export function getStatusProgressPercent(params: {
	deltaScoreToNextBucketScaled: number;
	isHighestBucketReached: boolean;
	nextBucketThresholdScoreScaled?: number | null;
	weeklyScoreScaled: number;
}): number {
	const { deltaScoreToNextBucketScaled, isHighestBucketReached, nextBucketThresholdScoreScaled, weeklyScoreScaled } = params;
	if (isHighestBucketReached) return 100;

	const fallbackThreshold = weeklyScoreScaled + deltaScoreToNextBucketScaled;
	const threshold = nextBucketThresholdScoreScaled ?? fallbackThreshold;
	if (threshold <= 0) return 0;

	const percent = (weeklyScoreScaled / threshold) * 100;

	return Math.min(100, Math.max(0, percent));
}

export function getTopStatusSuggestions(suggestions: TParticipationSuggestion[]): TParticipationSuggestion[] {
	return [...suggestions].sort((left, right) => right.estimated_gain_scaled - left.estimated_gain_scaled).slice(0, MAX_SUGGESTIONS);
}

export function formatStatusBucketLabel(bucket?: string | null): string {
	if (!bucket) return "";

	const normalized = bucket.replace(/[_-]/g, " ").trim();
	if (!normalized) return "";

	return normalized.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getStatusBucketPercent(bucket?: string | null): number | null {
	if (!bucket) return null;

	const normalizedBucket = bucket.trim();
	const percentileBucket = Number(normalizedBucket);
	if (Number.isFinite(percentileBucket) && percentileBucket >= 0 && percentileBucket <= 1) {
		return Math.round(percentileBucket * 100);
	}

	return null;
}

export function getNextBucketTargetPercent(bucket?: string | null): number | null {
	if (!bucket) return null;

	const normalizedBucket = bucket.trim();
	const percentileBucket = Number(normalizedBucket);
	if (Number.isFinite(percentileBucket) && percentileBucket >= 0 && percentileBucket <= 1) {
		return Math.round((1 - percentileBucket) * 100);
	}

	return null;
}

export function getTopMostActivePercentFromPositionPercentile(positionPercentile?: string | null): number | null {
	if (!positionPercentile) return null;

	const percentile = Number(positionPercentile);
	if (!Number.isFinite(percentile) || percentile < 0 || percentile > 1) return null;

	const topMostActivePercent = (1 - percentile) * 100;

	return Math.round(topMostActivePercent);
}
