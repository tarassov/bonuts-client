import { describe, expect, it } from "vitest";

import type { TParticipationSuggestion } from "./your-status-helper";
import { formatStatusBucketLabel, getStatusProgressPercent, getStatusTone, getTopMostActivePercentFromPositionPercentile, getTopStatusSuggestions } from "./your-status-helper";

const SUGGESTIONS: TParticipationSuggestion[] = [
	{
		type: "peer_recognition",
		count: 2,
		estimated_gain_scaled: 40,
		message: "Recognize teammates",
	},
	{
		type: "comment_activity",
		count: 5,
		estimated_gain_scaled: 15,
		message: "Leave comments",
	},
	{
		type: "weekly_post",
		count: 1,
		estimated_gain_scaled: 25,
		message: "Create a post",
	},
];

describe("your-status-helper", () => {
	describe("getStatusTone", () => {
		it("returns primary for low score", () => {
			expect(getStatusTone(10, false)).toBe("primary");
		});

		it("returns secondary at threshold", () => {
			expect(getStatusTone(40, false)).toBe("secondary");
		});

		it("returns warning at threshold", () => {
			expect(getStatusTone(120, false)).toBe("warning");
		});

		it("returns success when highest bucket is reached", () => {
			expect(getStatusTone(0, true)).toBe("success");
		});
	});

	describe("getStatusProgressPercent", () => {
		it("returns 100 for highest bucket", () => {
			expect(
				getStatusProgressPercent({
					weeklyScoreScaled: 100,
					deltaScoreToNextBucketScaled: 10,
					nextBucketThresholdScoreScaled: 200,
					isHighestBucketReached: true,
				})
			).toBe(100);
		});

		it("calculates progress with next bucket threshold", () => {
			expect(
				getStatusProgressPercent({
					weeklyScoreScaled: 50,
					deltaScoreToNextBucketScaled: 20,
					nextBucketThresholdScoreScaled: 100,
					isHighestBucketReached: false,
				})
			).toBe(50);
		});

		it("uses fallback threshold when next bucket threshold is missing", () => {
			expect(
				getStatusProgressPercent({
					weeklyScoreScaled: 60,
					deltaScoreToNextBucketScaled: 40,
					nextBucketThresholdScoreScaled: null,
					isHighestBucketReached: false,
				})
			).toBe(60);
		});

		it("returns 0 for non-positive threshold", () => {
			expect(
				getStatusProgressPercent({
					weeklyScoreScaled: 0,
					deltaScoreToNextBucketScaled: 0,
					nextBucketThresholdScoreScaled: 0,
					isHighestBucketReached: false,
				})
			).toBe(0);
		});
	});

	describe("getTopStatusSuggestions", () => {
		it("returns max two suggestions sorted by gain desc", () => {
			const result = getTopStatusSuggestions(SUGGESTIONS);

			expect(result).toHaveLength(2);
			expect(result[0].estimated_gain_scaled).toBe(40);
			expect(result[1].estimated_gain_scaled).toBe(25);
		});

		it("does not mutate original array", () => {
			const copy = [...SUGGESTIONS];

			getTopStatusSuggestions(SUGGESTIONS);

			expect(SUGGESTIONS).toEqual(copy);
		});
	});

	describe("formatStatusBucketLabel", () => {
		it("formats snake case bucket to title case", () => {
			expect(formatStatusBucketLabel("top_25")).toBe("Top 25");
		});

		it("returns empty string for empty bucket", () => {
			expect(formatStatusBucketLabel("")).toBe("");
			expect(formatStatusBucketLabel(null)).toBe("");
		});
	});

	describe("getTopMostActivePercentFromPositionPercentile", () => {
		it("maps percentile to top most active percent", () => {
			expect(getTopMostActivePercentFromPositionPercentile("0.5")).toBe(50);
			expect(getTopMostActivePercentFromPositionPercentile("0.75")).toBe(25);
		});

		it("returns null for invalid percentile", () => {
			expect(getTopMostActivePercentFromPositionPercentile("-0.1")).toBeNull();
			expect(getTopMostActivePercentFromPositionPercentile("1.1")).toBeNull();
			expect(getTopMostActivePercentFromPositionPercentile("abc")).toBeNull();
			expect(getTopMostActivePercentFromPositionPercentile(null)).toBeNull();
		});
	});
});
