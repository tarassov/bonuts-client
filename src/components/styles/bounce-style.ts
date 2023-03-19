import { Theme } from "@mui/material/styles";

export const bounceStyle = (theme: Theme) => {
	return {
		animation: "bounceEffect 0.5s both ease-in-out",
		fontSmooth: "subpixel-antialiased",
		"@keyframes bounceEffect": {
			"0%": {
				opacity: 1,
				transform: "scale(1)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"30%": {
				opacity: 1,
				transform: "scale(1.02)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"40%": {
				opacity: 1,
				transform: "scale(1.048)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"60%": {
				opacity: 1,
				transform: "scale(1.04)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"80%": {
				opacity: 1,
				transform: "scale(1.03)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"100%": {
				opacity: 1,
				transform: "scale(1.05)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
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
