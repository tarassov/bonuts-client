import type { FC } from "react";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { BntTransparentButton } from "@/shared/ui/buttons";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntTypography } from "@/shared/ui/typography";

import { getRequestDisplayName, getRequestEmail, getRequestInitials, getRequestPosition } from "../model/request-feed-helpers";

import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import type { TRequest } from "@/types/model/request";

type RequestFeedProfileCellProps = {
	request: TRequest;
};

export const RequestFeedProfileCell: FC<RequestFeedProfileCellProps> = ({ request }) => {
	const theme = useTheme();
	const { showEmployeeModal } = useEmployeeUi();
	const displayName = getRequestDisplayName(request);
	const email = getRequestEmail(request);
	const position = getRequestPosition(request);
	const avatarUrl = request.profile?.user_avatar?.thumb?.url || request.profile?.user_avatar?.url;

	if (request.profile) {
		return (
			<Stack direction="row" gap={{ xs: 1, sm: 1.5 }} alignItems="flex-start" sx={{ minWidth: 0, flex: { xs: 1, md: "0 1 auto" } }}>
				<BntTransparentButton disableRipple onClick={() => showEmployeeModal(request.profile?.id)} sx={{ justifyContent: "flex-start", p: 0, minWidth: 0, width: "fit-content", maxWidth: "100%" }}>
					<Stack direction="row" gap={{ xs: 1, sm: 1.5 }} alignItems="flex-start" sx={{ minWidth: 0, flex: { xs: 1, md: "0 1 auto" } }}>
						<ProfileAvatar avatarUrl={avatarUrl} fallback={getRequestInitials(request)} name={displayName} />
						<Stack gap={0.25} sx={{ minWidth: 0, flex: 1 }}>
							<BntTypography fontWeight={700} sx={{ color: "text.primary", textAlign: "left", fontSize: { xs: "0.9375rem", sm: theme.typography.subtitle1.fontSize } }}>
								{displayName}
							</BntTypography>
							{position ? (
								<BntTypography variant="body2" sx={{ color: "text.secondary", textAlign: "left", fontSize: { xs: "0.8125rem", sm: undefined } }}>
									{position}
								</BntTypography>
							) : null}
							{email ? (
								<BntTypography variant="body2" sx={{ color: "text.secondary", overflowWrap: "anywhere", textAlign: "left", fontSize: { xs: "0.8125rem", sm: undefined } }}>
									{email}
								</BntTypography>
							) : null}
						</Stack>
					</Stack>
				</BntTransparentButton>
			</Stack>
		);
	}

	return (
		<Stack direction="row" gap={{ xs: 1, sm: 1.5 }} alignItems="flex-start" sx={{ minWidth: 0, flex: { xs: 1, md: "0 1 auto" } }}>
			<ProfileAvatar avatarUrl={avatarUrl} fallback={getRequestInitials(request)} name={displayName} />
			<Stack gap={0.25} sx={{ minWidth: 0, flex: 1 }}>
				<BntTypography variant="subtitle1" fontWeight={700} sx={{ color: "text.primary", fontSize: { xs: "0.9375rem", sm: undefined } }}>
					{displayName}
				</BntTypography>
				{position ? (
					<BntTypography variant="body2" sx={{ color: "text.secondary", fontSize: { xs: "0.8125rem", sm: undefined } }}>
						{position}
					</BntTypography>
				) : null}
				{email ? (
					<BntTypography variant="body2" sx={{ color: "text.secondary", overflowWrap: "anywhere", fontSize: { xs: "0.8125rem", sm: undefined } }}>
						{email}
					</BntTypography>
				) : null}
			</Stack>
		</Stack>
	);
};
