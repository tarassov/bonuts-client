import type { FC, ReactNode } from "react";
import { memo } from "react";
import { Box, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { BntButton, BntTransparentButton } from "@/shared/ui/buttons";

interface IInvitationPreviewItemProps {
	actionLabel: string;
	dateLabel?: string;
	logoAlt: string;
	logoContent: ReactNode;
	metaLines?: Array<string>;
	onAction: VoidFunction;
	onSecondaryAction?: VoidFunction;
	secondaryActionLabel?: string;
	title: string;
}

const ItemRoot = styled("article")(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
	gap: theme.spacing(2),
	alignItems: "center",
	padding: theme.spacing(1.75, 2.25),
	border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.14 : 0.1)}`,
	borderRadius: theme.spacing(2),
	background: alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.04 : 0.45),
	[theme.breakpoints.down("md")]: {
		gridTemplateColumns: "auto minmax(0, 1fr)",
		"& > :last-child": {
			gridColumn: 2,
			justifySelf: "start",
		},
	},
}));

const ItemLogo = styled(Box)(({ theme }) => ({
	display: "grid",
	placeItems: "center",
	width: 60,
	height: 60,
	borderRadius: theme.spacing(2.25),
	background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.24)}, ${alpha(theme.palette.primary.main, 0.08)})`,
	boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.34 : 0.28)}`,
	overflow: "hidden",
	color: theme.palette.primary.main,
	fontSize: theme.typography.pxToRem(18),
	fontWeight: 800,
	"& img": {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
}));

const ItemBody = styled(Box)({
	minWidth: 0,
});

const ItemTitle = styled("p")(({ theme }) => ({
	margin: 0,
	fontSize: theme.typography.pxToRem(17),
	fontWeight: 800,
	lineHeight: 1.35,
}));

const ItemMeta = styled("p")(({ theme }) => ({
	margin: 0,
	color: alpha(theme.palette.text.primary, 0.68),
	lineHeight: 1.55,
}));

const ItemDate = styled("div")(({ theme }) => ({
	color: alpha(theme.palette.text.primary, 0.68),
	textAlign: "right",
	whiteSpace: "nowrap",
	[theme.breakpoints.down("md")]: {
		gridColumn: 2,
		justifySelf: "start",
		textAlign: "left",
	},
}));

const ActionButton = styled(BntButton)(({ theme }) => ({
	minHeight: 48,
	paddingInline: theme.spacing(2.5),
	borderRadius: theme.spacing(1.5),
	fontWeight: 700,
	whiteSpace: "nowrap",
}));

const SecondaryActionButton = styled(BntTransparentButton)(({ theme }) => ({
	minHeight: 48,
	paddingInline: theme.spacing(1),
	borderRadius: theme.spacing(1.5),
	fontWeight: 700,
	whiteSpace: "nowrap",
}));

const ActionsGroup = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(1),
	justifySelf: "end",
	[theme.breakpoints.down("md")]: {
		gridColumn: 2,
		justifySelf: "start",
		flexWrap: "wrap",
	},
}));

const InvitationPreviewItemComponent: FC<IInvitationPreviewItemProps> = ({
	actionLabel,
	dateLabel,
	logoAlt,
	logoContent,
	metaLines = [],
	onAction,
	onSecondaryAction,
	secondaryActionLabel,
	title,
}) => {
	return (
		<ItemRoot>
			<ItemLogo aria-label={logoAlt}>{logoContent}</ItemLogo>
			<ItemBody>
				<ItemTitle>{title}</ItemTitle>
				{metaLines.filter(Boolean).map((line) => (
					<ItemMeta key={line}>{line}</ItemMeta>
				))}
			</ItemBody>
			<ItemDate>{dateLabel}</ItemDate>
			<ActionsGroup>
				{secondaryActionLabel && onSecondaryAction && <SecondaryActionButton onClick={onSecondaryAction}>{secondaryActionLabel}</SecondaryActionButton>}
				<ActionButton noTransform onClick={onAction} variant="outlined">
					{actionLabel}
				</ActionButton>
			</ActionsGroup>
		</ItemRoot>
	);
};

export const InvitationPreviewItem = memo(InvitationPreviewItemComponent);
