import { texts_l } from "@/services/localization/texts";

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

const WEEKLY_TITLE_KEYS: string[] = [
	texts_l.nominees_of_the_week,
	texts_l.donuts_oscars,
	texts_l.academy_choice,
	texts_l.hall_of_fame_of_the_week,
	texts_l.laureates_of_the_week,
	texts_l.legendary_five_of_the_week,
	texts_l.loud_names_of_the_week,
	texts_l.recognition_podium,
	texts_l.recognition_spotlight,
	texts_l.applause_of_the_week,
];

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

export function getRandomWeeklyTitleKey() {
	const randomIndex = Math.floor(Math.random() * WEEKLY_TITLE_KEYS.length);

	return WEEKLY_TITLE_KEYS[randomIndex];
}
