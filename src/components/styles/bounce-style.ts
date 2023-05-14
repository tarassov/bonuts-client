export const bounceStyle = () => {
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
				transform: "scale(1.002)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"40%": {
				opacity: 1,
				transform: "scale(1.0048)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"60%": {
				opacity: 1,
				transform: "scale(1.004)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"80%": {
				opacity: 1,
				transform: "scale(1.003)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
				transformOrigin: "100% 0",
			},
			"100%": {
				opacity: 1,
				transform: "scale(1.005)",
				filter: "blur(.0px)",
				backfaceVisibility: "hidden",
			},
		},
	};
};

export const pulsateStyle = () => {
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
