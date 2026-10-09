import type { FC } from "react";
import { Stack } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntButton } from "@/shared/ui/buttons";
import { BntTypography } from "@/shared/ui/typography";

import type { TRequestItemAction } from "./request-feed-item.types";

type RequestFeedActionsCellProps = {
	createdAt?: string | null;
	primaryAction?: TRequestItemAction;
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

export const RequestFeedActionsCell: FC<RequestFeedActionsCellProps> = ({ createdAt, primaryAction, secondaryAction }) => {
	const { getFormattedDate } = useFormattedDate();

	return (
		<Stack direction="row" gap={{ xs: 1, sm: 1.5 }} alignItems="center" justifyContent="space-between" sx={{ width: { xs: "100%", md: "auto" } }}>
			<Stack direction="row" gap={0.75} flexWrap="wrap" sx={{ minWidth: 0, flex: { xs: 1, md: "0 1 auto" } }}>
				{primaryAction ? (
					<BntButton
						noTransform
						onClick={primaryAction.onClick}
						startIcon={primaryAction.icon}
						sx={{
							minWidth: { xs: 96, sm: 112 },
							minHeight: { xs: 34, sm: 40 },
							borderRadius: 2,
							px: { xs: 1.25, sm: 2 },
							fontSize: { xs: "0.8125rem", sm: undefined },
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
							minWidth: { xs: 96, sm: 112 },
							minHeight: { xs: 34, sm: 40 },
							borderRadius: 2,
							px: { xs: 1.25, sm: 2 },
							fontSize: { xs: "0.8125rem", sm: undefined },
							...actionToneSx[secondaryAction.tone],
						}}
						variant="outlined"
					>
						{secondaryAction.label}
					</BntButton>
				) : null}
			</Stack>
			<BntTypography
				variant="body2"
				sx={{
					color: "text.secondary",
					whiteSpace: "nowrap",
					fontSize: { xs: "0.8125rem", sm: undefined },
					flexShrink: 0,
					textAlign: "right",
				}}
			>
				{createdAt ? getFormattedDate(createdAt) : ""}
			</BntTypography>
		</Stack>
	);
};
