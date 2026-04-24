import { intlFormat, parse, parseISO } from "date-fns";

export type TLeaderboardRecognitionBadge = {
	score: number;
	title: string;
	profile: {
		id: number;
		first_name: string;
		last_name: string;
		full_name: string;
		avatar: string;
	};
};

export type TRankedLeaderboardProfile = {
	id: number;
	avatar: string;
	name: string;
	score: number;
	badgeCount: number;
	topBadgeTitle: string;
};

export type TLeaderMedalTone = "gold" | "silver" | "bronze";

export function getLeaderboardDisplayName(profile?: { first_name?: string | null; last_name?: string | null; full_name?: string; name?: string }) {
	const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();

	return fullName || profile?.full_name || profile?.name || "";
}

export function getRankedLeaderboardProfiles(badges: TLeaderboardRecognitionBadge[]): TRankedLeaderboardProfile[] {
	const rankedMap = new Map<number, TRankedLeaderboardProfile>();

	badges.forEach((badge) => {
		const current = rankedMap.get(badge.profile.id);
		const name = getLeaderboardDisplayName(badge.profile);

		if (!current) {
			rankedMap.set(badge.profile.id, {
				id: badge.profile.id,
				avatar: badge.profile.avatar,
				name,
				score: badge.score,
				badgeCount: 1,
				topBadgeTitle: badge.title,
			});

			return;
		}

		rankedMap.set(badge.profile.id, {
			...current,
			score: current.score + badge.score,
			badgeCount: current.badgeCount + 1,
			topBadgeTitle: badge.score > current.score ? badge.title : current.topBadgeTitle,
		});
	});

	return [...rankedMap.values()].sort((left, right) => right.score - left.score || right.badgeCount - left.badgeCount || left.name.localeCompare(right.name));
}

export function getLeaderMedalTone(index: number): TLeaderMedalTone {
	if (index === 0) {
		return "gold";
	}

	if (index === 1) {
		return "silver";
	}

	return "bronze";
}

export function formatLeaderboardWeekDate(isoDate?: string, locale?: string): string {
	if (!isoDate) {
		return "";
	}

	const dateOnlyMatch = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	const date = dateOnlyMatch ? parse(isoDate, "yyyy-MM-dd", new Date()) : parseISO(isoDate);

	if (Number.isNaN(date.getTime())) {
		return "";
	}

	return intlFormat(
		date,
		{
			day: "2-digit",
			month: "short",
			year: "numeric",
		},
		{
			...(locale ? { locale } : {}),
		}
	);
}
