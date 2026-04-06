export type TYourPositionRecognitionBadge = {
	score: number;
	profile: {
		id: number;
		first_name: string;
		last_name: string;
		full_name: string;
	};
};

export type TRankedPositionProfile = {
	id: number;
	name: string;
	score: number;
	badgeCount: number;
	rank: number;
};

export function getYourPositionDisplayName(profile?: { first_name?: string | null; last_name?: string | null; full_name?: string; name?: string }) {
	const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();

	return fullName || profile?.full_name || profile?.name || "";
}

export function getRankedPositionProfiles(badges: TYourPositionRecognitionBadge[]): TRankedPositionProfile[] {
	const rankedMap = new Map<number, Omit<TRankedPositionProfile, "rank">>();

	badges.forEach((badge) => {
		const current = rankedMap.get(badge.profile.id);
		const name = getYourPositionDisplayName(badge.profile);

		if (!current) {
			rankedMap.set(badge.profile.id, {
				id: badge.profile.id,
				name,
				score: badge.score,
				badgeCount: 1,
			});

			return;
		}

		rankedMap.set(badge.profile.id, {
			...current,
			score: current.score + badge.score,
			badgeCount: current.badgeCount + 1,
		});
	});

	return [...rankedMap.values()]
		.sort((left, right) => right.score - left.score || right.badgeCount - left.badgeCount || left.name.localeCompare(right.name))
		.map((item, index) => ({ ...item, rank: index + 1 }));
}
