import type { FC, ReactNode } from "react";
import { Chip, Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { useFormattedDate } from "@/shared/lib/date";
import { BntButton } from "@/shared/ui/buttons";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntTypography } from "@/shared/ui/typography";

import { getRequestDisplayName, getRequestDonutName, getRequestEmail, getRequestInitials, getRequestPosition } from "../model/request-feed.helpers";

import { DEFAULT_DONUT_IMAGE } from "@/constants/images";
import { useBonutsIcon } from "@/hooks/use-bonuts-icon";
import type { TRequest } from "@/types/model/request";

type TRequestItemAction = {
	icon: ReactNode;
	label: string;
	onClick: () => void;
	tone: "primary" | "success" | "error";
};

type RequestFeedItemProps = {
	isMyRequestView?: boolean;
	primaryAction?: TRequestItemAction;
	request: TRequest;
	secondaryAction?: TRequestItemAction;
};

const actionToneSx = {
	error: {
		borderColor: "error.light",
		color: "error.main",
	},
	primary: {
		borderColor: "primary.light",
		color: "primary.main",
	},
	success: {
		borderColor: "success.light",
		color: "success.main",
	},
} as const;

export const RequestFeedItem: FC<RequestFeedItemProps> = ({ isMyRequestView = false, primaryAction, request, secondaryAction }) => {
	const theme = useTheme();
	const { getFormattedDate } = useFormattedDate();
	const { BonutsCurrency } = useBonutsIcon({ height: "16px", width: "16px" });
	const displayName = getRequestDisplayName(request);
	const donutName = getRequestDonutName(request);
	const email = getRequestEmail(request);
	const position = getRequestPosition(request);
	const donutPrice = request.donut?.price;
	const donutLogo = request.donut?.logo?.thumb?.url || request.donut?.logo?.url || DEFAULT_DONUT_IMAGE;

	return (
		<Stack
			component="article"
			direction={{ xs: "column", md: "row" }}
			gap={2}
			alignItems={{ xs: "stretch", md: "center" }}
			justifyContent="space-between"
			sx={{
				borderBottom: `1px solid ${theme.palette.divider}`,
				px: { xs: 2, md: 3 },
				py: 2,
				"&:last-of-type": {
					borderBottom: "none",
				},
			}}
		>
			<Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ minWidth: 0, flex: 1 }}>
				{isMyRequestView ? (
					<Stack direction="row" gap={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
						<Stack
							alignItems="center"
							justifyContent="center"
							sx={{
								width: 56,
								height: 56,
								borderRadius: 2,
								bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.08),
								overflow: "hidden",
								flexShrink: 0,
							}}
						>
							<img alt={donutName || "..."} src={donutLogo} style={{ width: 40, height: 40, objectFit: "contain" }} />
						</Stack>
						<Stack gap={0.5} sx={{ minWidth: 0, flex: 1 }}>
							<BntTypography variant="h6" fontWeight={700} sx={{ color: "text.primary" }}>
								{donutName}
							</BntTypography>
							{typeof donutPrice === "number" ? (
								<Stack direction="row" gap={0.75} alignItems="center" sx={{ color: "text.secondary" }}>
									<BntTypography variant="body1" fontWeight={600} sx={{ color: "text.secondary" }}>
										{donutPrice}
									</BntTypography>
									<BonutsCurrency />
								</Stack>
							) : null}
						</Stack>
					</Stack>
				) : (
					<>
						<Stack direction="row" gap={1.5} alignItems="flex-start" sx={{ minWidth: 0, flex: 1 }}>
							<ProfileAvatar avatarUrl={request.profile?.user_avatar?.thumb?.url || request.profile?.user_avatar?.url} fallback={getRequestInitials(request)} name={displayName} />
							<Stack gap={0.5} sx={{ minWidth: 0, flex: 1 }}>
								<BntTypography variant="subtitle1" fontWeight={700} sx={{ color: "text.primary" }}>
									{displayName}
								</BntTypography>
								{position ? (
									<BntTypography variant="body2" sx={{ color: "text.secondary" }}>
										{position}
									</BntTypography>
								) : null}
								{email ? (
									<BntTypography variant="body2" sx={{ color: "text.secondary", overflowWrap: "anywhere" }}>
										{email}
									</BntTypography>
								) : null}
							</Stack>
						</Stack>
						{donutName ? (
							<Chip
								label={donutName}
								size="small"
								sx={{
									alignSelf: { xs: "flex-start", sm: "center" },
									borderRadius: 2,
									bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.16 : 0.08),
									color: "text.primary",
									maxWidth: "100%",
									"& .MuiChip-label": {
										display: "block",
										overflow: "hidden",
										textOverflow: "ellipsis",
									},
								}}
							/>
						) : null}
					</>
				)}
			</Stack>

			<Stack direction={{ xs: "column", sm: "row" }} gap={1.5} alignItems={{ xs: "flex-start", md: "center" }}>
				<BntTypography variant="body2" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
					{request.created_at ? getFormattedDate(request.created_at) : ""}
				</BntTypography>
				<Stack direction="row" gap={1} flexWrap="wrap">
					{primaryAction ? (
						<BntButton
							noTransform
							onClick={primaryAction.onClick}
							startIcon={primaryAction.icon}
							sx={{
								minWidth: 112,
								borderRadius: 2,
								...actionToneSx[primaryAction.tone],
							}}
							variant="outlined"
						>
							{primaryAction.label}
						</BntButton>
					) : null}
					{secondaryAction ? (
						<BntButton
							noTransform
							onClick={secondaryAction.onClick}
							startIcon={secondaryAction.icon}
							sx={{
								minWidth: 112,
								borderRadius: 2,
								...actionToneSx[secondaryAction.tone],
							}}
							variant="outlined"
						>
							{secondaryAction.label}
						</BntButton>
					) : null}
				</Stack>
			</Stack>
		</Stack>
	);
};
