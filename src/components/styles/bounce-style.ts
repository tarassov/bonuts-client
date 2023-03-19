import { Theme } from "@mui/material/styles";

export const bounceStyle = (theme: Theme) => {
	return {
		animation: "bounceEffect 0.9s both ease-in-out",
		"@keyframes bounceEffect": {
			"0%": {
				opacity: 1,
				transform: "scale(1.0)",
			},
			"20%": {
				opacity: 1,
				transform: "scale(1.08)",
			},
			"40%": {
				opacity: 1,
				transform: "scale(1.1)",
			},
			"60%": {
				opacity: 1,
				transform: "scale(1.08)",
			},
			"80%": {
				opacity: 1,
				transform: "scale(1.09)",
			},
			"100%": {
				opacity: 1,
				transform: "scale(1.11)",
			},
		},
	};
};

export const pulsateStyle = (theme: Theme) => {
	return {
		"@keyframes pulsate": {
			from: {
				opacity: 1,
				transform: "scale(1)",
			},
			to: {
				opacity: 0,
				transform: "scale(2)",
			},
		},
		animation: "pulsate 1s infinite ease",
		position: "absolute",
	};
};
