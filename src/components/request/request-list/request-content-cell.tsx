import { FC } from "react";
import { BntProfileButton } from "components/buttons/profile-button";
import { emptyFunction } from "utils/empty-function";
import { BntStack } from "shared/stack/stack";
import { DonutButton } from "components/buttons/donut-button";
import { texts_t } from "services/localization/texts/texts_t";
import { useFormattedDate } from "hooks/use-formatted-date";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTypography } from "shared/typography/typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { CommonStrings } from "constants/dictionary";
import { TDonut, TProfile } from "@/types/model";

type RequestContentCellProps = {
	donut?: Pick<TDonut, "logo" | "name">;
	profile?: TProfile;
	datetime?: string;
};
export const RequestContentCell: FC<RequestContentCellProps> = ({ profile, donut, datetime }) => {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { getFormattedDate } = useFormattedDate();
	return (
		<BntStack
			direction={matchesDownSm ? "column" : "row"}
			alignItems={matchesDownSm ? "flex-start" : "center"}
			className={matchesDownSm ? "pl-3" : "pl-1"}
		>
			{donut && <DonutButton donut={donut} onClick={emptyFunction} />}
			<BntTypography
				variant="body2"
				color="grey.dark"
				className={matchesDownSm ? "pl-3" : CommonStrings.EMPTY_STRING}
			>
				{translate(texts_t.to)}
			</BntTypography>
			{profile && <BntProfileButton profile={profile} onClick={emptyFunction} />}
			<BntTypography
				variant="body2"
				color="grey"
				className={matchesDownSm ? "pl-3" : CommonStrings.EMPTY_STRING}
			>
				{datetime ? getFormattedDate(datetime) : null}
			</BntTypography>
		</BntStack>
	);
};
