import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export enum BntActionButtonVariant {
	brandGradient = "brandGradient",
}

interface IBntActionButtonProps {
	icon: ReactNode;
	onClick: VoidFunction;
	text: string;
	variant: BntActionButtonVariant;
}

const DATA_TEST_ID_BY_VARIANT = {
	[BntActionButtonVariant.brandGradient]: "brand-gradient-action-button",
} satisfies Record<BntActionButtonVariant, string>;

const ActionButtonRoot = styled(Button, {
	shouldForwardProp: (prop) => prop !== "actionVariant",
})<{ actionVariant: BntActionButtonVariant }>(({ theme, actionVariant }) => {
	const isBrandGradient = actionVariant === BntActionButtonVariant.brandGradient;
	const background = isBrandGradient ? "linear-gradient(90deg, #ff8a3d 0%, #e6ad57 100%)" : theme.palette.primary.main;

	return {
		display: "inline-flex",
		alignItems: "center",
		flexShrink: 0,
		alignSelf: "center",
		gap: "11px",
		minWidth: 0,
		height: "50px",
		padding: "0 24px 0 15px",
		border: "none",
		borderRadius: "14px",
		background,
		boxShadow: "0 12px 24px rgba(255,138,61,.28)",
		color: theme.palette.common.white,
		fontFamily: "Roboto",
		fontSize: "16px",
		fontWeight: 700,
		textTransform: "none",
		transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
		[theme.breakpoints.down("sm")]: {
			alignSelf: "stretch",
		},
		"& .MuiButton-startIcon": {
			margin: 0,
		},
		"&:hover": {
			background,
			transform: "translateY(-2px)",
			boxShadow: "0 16px 34px rgba(255,138,61,.44)",
			filter: "brightness(1.05)",
		},
		"&:active": {
			transform: "translateY(0)",
			boxShadow: "0 10px 20px rgba(255,138,61,.24)",
			filter: "brightness(1)",
		},
		"&.Mui-disabled": {
			background: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[400],
			boxShadow: "none",
			color: theme.palette.common.white,
			cursor: "default",
		},
		"@media (prefers-reduced-motion: reduce)": {
			transition: "box-shadow 200ms ease",
			"&:hover": {
				transform: "none",
				filter: "none",
			},
			"&:active": {
				transform: "none",
				filter: "none",
			},
		},
	};
});

const ActionButtonIcon = styled("span")({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	width: "34px",
	height: "34px",
	borderRadius: "50%",
	backgroundColor: "rgba(255,255,255,.22)",
	"& > *:first-of-type": {
		fontSize: "21px",
	},
});

export function BntActionButton({ icon, onClick, text, variant }: IBntActionButtonProps) {
	return (
		<ActionButtonRoot actionVariant={variant} data-testid={DATA_TEST_ID_BY_VARIANT[variant]} onClick={onClick} startIcon={<ActionButtonIcon>{icon}</ActionButtonIcon>}>
			{text}
		</ActionButtonRoot>
	);
}
