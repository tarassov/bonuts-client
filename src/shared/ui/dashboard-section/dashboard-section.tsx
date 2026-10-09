import type { FC, ReactNode } from "react";
import { memo } from "react";
import { Box, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

export enum DashboardSectionVariant {
	Default = "default",
	Warm = "warm",
	Danger = "danger",
}

interface IDashboardSectionProps {
	action?: ReactNode;
	children: ReactNode;
	className?: string;
	media: ReactNode;
	variant?: DashboardSectionVariant;
}

interface IDashboardSectionMediaProps {
	children: ReactNode;
	className?: string;
	variant?: DashboardSectionVariant;
}

const SectionRoot = styled("section", {
	shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: DashboardSectionVariant }>(({ theme, variant }) => {
	const surfaceBackground = alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.78 : 0.88);
	const baseGradient =
		variant === DashboardSectionVariant.Warm
			? "linear-gradient(180deg, rgba(255, 138, 61, 0.06), rgba(255, 138, 61, 0.02))"
			: variant === DashboardSectionVariant.Danger
				? "linear-gradient(180deg, rgba(239, 68, 68, 0.06), rgba(239, 68, 68, 0.02))"
				: surfaceBackground;

	return {
		display: "grid",
		gridTemplateColumns: "auto minmax(0, 1fr) auto",
		gap: theme.spacing(3),
		alignItems: "center",
		padding: theme.spacing(3),
		borderRadius: theme.spacing(2.5),
		border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.14 : 0.1)}`,
		background: variant === DashboardSectionVariant.Default ? surfaceBackground : `${baseGradient}, ${surfaceBackground}`,
		boxShadow: theme.palette.mode === "dark" ? `0 20px 60px ${alpha(theme.palette.common.black, 0.24)}` : `0 20px 48px ${alpha(theme.palette.grey[700], 0.12)}`,
		backdropFilter: "blur(10px)",
		[theme.breakpoints.down("md")]: {
			gridTemplateColumns: "auto minmax(0, 1fr)",
			"& > :last-child": {
				gridColumn: "1 / -1",
			},
		},
	};
});

const SectionMediaRoot = styled(Box, {
	shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: DashboardSectionVariant }>(({ theme, variant }) => {
	const accentColor = variant === DashboardSectionVariant.Danger ? theme.palette.error.main : theme.palette.primary.main;
	const background =
		variant === DashboardSectionVariant.Default
			? `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.24)}, ${alpha(theme.palette.primary.main, 0.08)})`
			: variant === DashboardSectionVariant.Warm
				? "rgba(255, 138, 61, 0.08)"
				: "rgba(239, 68, 68, 0.08)";
	const borderColor =
		variant === DashboardSectionVariant.Default
			? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.34 : 0.28)
			: variant === DashboardSectionVariant.Warm
				? "rgba(255, 138, 61, 0.16)"
				: "rgba(239, 68, 68, 0.16)";

	return {
		display: "grid",
		placeItems: "center",
		width: 88,
		height: 88,
		minWidth: 88,
		borderRadius: 28,
		background,
		boxShadow: `inset 0 0 0 1px ${borderColor}`,
		color: accentColor,
		fontSize: theme.typography.pxToRem(32),
		fontWeight: 800,
		overflow: "hidden",
	};
});

const SectionContent = styled(Box)({
	minWidth: 0,
});

const SectionAction = styled(Box)({
	display: "flex",
	justifyContent: "flex-end",
});

const DashboardSectionComponent: FC<IDashboardSectionProps> = ({ action, children, className, media, variant = DashboardSectionVariant.Default }) => {
	return (
		<SectionRoot className={className} variant={variant}>
			{media}
			<SectionContent>{children}</SectionContent>
			{action ? <SectionAction>{action}</SectionAction> : null}
		</SectionRoot>
	);
};

const DashboardSectionMediaComponent: FC<IDashboardSectionMediaProps> = ({ children, className, variant = DashboardSectionVariant.Default }) => {
	return (
		<SectionMediaRoot className={className} variant={variant}>
			{children}
		</SectionMediaRoot>
	);
};

export const DashboardSection = memo(DashboardSectionComponent);
export const DashboardSectionMedia = memo(DashboardSectionMediaComponent);
