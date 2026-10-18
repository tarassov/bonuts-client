import type { GetWeeklyRecognitionBadgesLatestApiResponse } from "@/services/api/bonuts-api";

export type TEmployeeRecognitionBadge = GetWeeklyRecognitionBadgesLatestApiResponse["badges"][number];

export function getTopEmployeeRecognitionBadge(badges: TEmployeeRecognitionBadge[], employeeId?: number | null): TEmployeeRecognitionBadge | null {
	if (!employeeId) {
		return null;
	}

	const employeeBadges = badges.filter((badge) => badge.profile.id === employeeId);
	if (!employeeBadges.length) {
		return null;
	}

	return employeeBadges.sort((left, right) => right.score - left.score)[0];
}
