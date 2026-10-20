import type { FC } from "react";

import { StatInline, StatLabel, StatsInline, StatTile, StatTiles, StatValue } from "./hero-stats.styles";

export type TBlackBoxHeroStat = {
	key: string;
	value: number;
	label: string;
	isHighlighted?: boolean;
};

type THeroStatsProps = {
	stats: Array<TBlackBoxHeroStat>;
};

/** Numbers as tiles, for a hero whose right side is only the numbers (the responder window). */
export const HeroStatTiles: FC<THeroStatsProps> = ({ stats }) => (
	<StatTiles>
		{stats.map((stat) => (
			<StatTile key={stat.key}>
				<StatValue isHighlighted={stat.isHighlighted}>{stat.value}</StatValue>
				<StatLabel>{stat.label}</StatLabel>
			</StatTile>
		))}
	</StatTiles>
);

/** Numbers in one line under the hero text, when the right side holds the question form. */
export const HeroStatsInline: FC<THeroStatsProps> = ({ stats }) => (
	<StatsInline>
		{stats.map((stat) => (
			<StatInline key={stat.key}>
				<StatValue isHighlighted={stat.isHighlighted}>{stat.value}</StatValue>
				<StatLabel>{stat.label}</StatLabel>
			</StatInline>
		))}
	</StatsInline>
);
