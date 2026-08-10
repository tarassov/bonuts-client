import type { PropsWithChildren } from "react";
import { Card, styled } from "@mui/material";

interface IBntSurfaceProps extends PropsWithChildren {
	className?: string;
	isInteractive?: boolean;
}

const Surface = styled(Card, {
	shouldForwardProp: (prop) => prop !== "isInteractive",
})<Pick<IBntSurfaceProps, "isInteractive">>(({ isInteractive, theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.spacing(2),
	backgroundImage: "none",
	boxShadow: theme.shadows[1],
	transition: theme.transitions.create(["border-color", "box-shadow", "transform"], {
		duration: theme.transitions.duration.shorter,
	}),
	...(isInteractive && {
		"&:hover": {
			borderColor: theme.palette.primary.light,
			boxShadow: theme.shadows[4],
			transform: "translateY(-3px)",
		},
		"@media (prefers-reduced-motion: reduce)": {
			transition: "none",
			"&:hover": { transform: "none" },
		},
	}),
}));

export function BntSurface({ children, className, isInteractive = false }: IBntSurfaceProps) {
	return (
		<Surface className={className} isInteractive={isInteractive} variant="outlined">
			{children}
		</Surface>
	);
}
