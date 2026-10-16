import type { FC } from "react";
import { Stack, type StackProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export enum BntStackVariant {
	default = "default",
	surface = "surface",
}

interface IBntStackProps extends StackProps {
	variant?: BntStackVariant;
}

const BntStackRoot = styled(Stack, {
	shouldForwardProp: (prop) => prop !== "variant",
})<IBntStackProps>(({ theme, variant = BntStackVariant.default }) => {
	if (variant !== BntStackVariant.surface) {
		return {};
	}

	const isDarkTheme = theme.palette.mode === "dark";

	return {
		borderRadius: theme.spacing(2),
		backgroundColor: isDarkTheme ? theme.palette.background.paper : theme.palette.common.white,
		border: `1px solid ${isDarkTheme ? theme.palette.divider : theme.palette.neutral.light}`,
		boxShadow: isDarkTheme ? "0 8px 24px rgba(0,0,0,0.28)" : "0 8px 24px rgba(30,31,37,0.05)",
	};
});

export const BntStack: FC<IBntStackProps> = (props) => {
	return <BntStackRoot {...props} />;
};
