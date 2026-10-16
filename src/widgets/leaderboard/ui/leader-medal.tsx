import { EmojiEventsRounded } from "@mui/icons-material";
import { keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

import type { TLeaderMedalTone } from "../model/leaderboard-helper";

interface ILeaderMedalProps {
	medalTone: TLeaderMedalTone;
}

const medalPulse = keyframes`
	0% { transform: scale(1); }
	50% { transform: scale(1.08); }
	100% { transform: scale(1); }
`;

const MedalIcon = styled(EmojiEventsRounded, {
	shouldForwardProp: (prop) => prop !== "medalTone",
})<ILeaderMedalProps>(({ medalTone, theme }) => ({
	fontSize: 18,
	animation: `${medalPulse} 1.8s ease-in-out infinite`,
	color: medalTone === "gold" ? theme.palette.warning.main : medalTone === "silver" ? theme.palette.grey[500] : theme.palette.warning.dark,
}));

export function LeaderMedal({ medalTone }: ILeaderMedalProps) {
	return <MedalIcon medalTone={medalTone} />;
}
