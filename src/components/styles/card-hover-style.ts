export const cardHoverStyle = () => {
	return {
		cardHover: {
			"&:hover": {
				"& $cardHeaderHover": {
					transform: "translate3d(0, -20px, 10px)",
				},
			},
		},
		cardIcon: {
			transition: "all 300ms cubic-bezier(0.34, 1.61, 0.7, 1)",
		},
		cardHoverUnder: {
			position: "absolute",
			zIndex: "1",
			top: "-50px",
			width: "calc(100% - 30px)",
			left: "17px",
			right: "17px",
			textAlign: "center",
		},
	};
};
