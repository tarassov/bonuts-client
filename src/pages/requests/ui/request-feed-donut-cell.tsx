import type { FC } from "react";
import { Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { BntTransparentButton } from "@/shared/ui/buttons";
import { BntTypography } from "@/shared/ui/typography";

import { getRequestDonutName } from "../model/request-feed-helpers";

import { DonutButton } from "@/components/buttons/donut-button";
import { DEFAULT_DONUT_IMAGE } from "@/constants/images";
import { useBonutsIcon } from "@/hooks/use-bonuts-icon";
import { useDonutUi } from "@/logic/ui/use-donut-ui";
import type { TRequest } from "@/types/model/request";

type RequestFeedDonutCellProps = {
	isMyRequestView?: boolean;
	request: TRequest;
};

export const RequestFeedDonutCell: FC<RequestFeedDonutCellProps> = ({ isMyRequestView = false, request }) => {
	const theme = useTheme();
	const { BonutsCurrency } = useBonutsIcon({ height: "16px", width: "16px" });
	const { showDonut } = useDonutUi(request.donut);
	const donutName = getRequestDonutName(request);
	const donutPrice = request.donut?.price;
	const donutLogo = request.donut?.logo?.thumb?.url || request.donut?.logo?.url || DEFAULT_DONUT_IMAGE;

	if (isMyRequestView) {
		return (
			<BntTransparentButton disableRipple onClick={() => showDonut(request.donut?.id)} sx={{ justifyContent: "flex-start", p: 0, minWidth: 0, width: "fit-content" }}>
				<Stack direction="row" gap={{ xs: 1, sm: 1.5 }} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
					<Stack
						alignItems="center"
						justifyContent="center"
						sx={{
							width: { xs: 44, sm: 56 },
							height: { xs: 44, sm: 56 },
							borderRadius: 2,
							bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.08),
							overflow: "hidden",
							flexShrink: 0,
						}}
					>
						<img alt={donutName || "..."} src={donutLogo} style={{ width: 30, height: 30, objectFit: "contain" }} />
					</Stack>
					<Stack gap={0.25} sx={{ minWidth: 0, flex: 1 }}>
						<BntTypography fontWeight={700} sx={{ color: "text.primary", textAlign: "left", fontSize: { xs: "0.9375rem", sm: theme.typography.h6.fontSize } }}>
							{donutName}
						</BntTypography>
						{typeof donutPrice === "number" ? (
							<Stack direction="row" gap={0.75} alignItems="center" sx={{ color: "text.secondary" }}>
								<BntTypography variant="body2" fontWeight={600} sx={{ color: "text.secondary", fontSize: { xs: "0.8125rem", sm: undefined } }}>
									{donutPrice}
								</BntTypography>
								<BonutsCurrency />
							</Stack>
						) : null}
					</Stack>
				</Stack>
			</BntTransparentButton>
		);
	}

	if (request.donut) {
		return (
			<Stack sx={{ minWidth: 0, ml: { md: 1 }, width: "fit-content", maxWidth: { xs: "100%", md: 280 } }}>
				<DonutButton
					buttonSx={{
						p: 0,
						minWidth: 0,
						justifyContent: "flex-start",
						maxWidth: "100%",
						"& .MuiButton-startIcon": {
							mr: 1,
							ml: 0,
						},
						"& .MuiAvatar-root": {
							width: { xs: 24, sm: 28 },
							height: { xs: 24, sm: 28 },
						},
						"& .MuiTypography-root": {
							display: "block",
							fontSize: { xs: "0.875rem", sm: "0.9375rem" },
							fontWeight: 600,
							textAlign: "left",
							maxWidth: "100%",
							whiteSpace: "normal",
							overflowWrap: "anywhere",
							lineHeight: 1.3,
						},
					}}
					donut={request.donut}
					onClick={() => showDonut(request.donut?.id)}
				/>
			</Stack>
		);
	}

	if (!donutName) return null;

	return (
		<BntTypography
			variant="body2"
			sx={{
				color: "text.secondary",
				fontSize: { xs: "0.875rem", sm: "0.9375rem" },
				fontWeight: 600,
				ml: { md: 1 },
				textAlign: "left",
				maxWidth: { xs: "100%", md: 280 },
				whiteSpace: "normal",
				overflowWrap: "anywhere",
				lineHeight: 1.3,
			}}
		>
			{donutName}
		</BntTypography>
	);
};
