import { FC } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import { useFormattedDate } from "@/shared/lib/date";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { DonutButton } from "@/components/buttons/donut-button";
import { BntProfileButton } from "@/components/buttons/profile-button";
import { CommonStrings } from "@/constants/dictionary";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_t } from "@/services/localization/texts/texts_t";
import { TDonut, TProfile } from "@/types/model";
import { emptyFunction } from "@/utils/empty-function";

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
		<Grid container className={matchesDownSm ? "pl-3" : "pl-1"}>
			<Grid item>
				<BntStack direction="row" alignItems="center">
					{donut && <DonutButton donut={donut} onClick={emptyFunction} />}

					<BntTypography variant="body2" color="grey.dark" className={matchesDownSm ? "pl-3" : CommonStrings.EMPTY_STRING}>
						{translate(texts_t.to)}
					</BntTypography>
				</BntStack>
			</Grid>
			<Grid item>
				<BntStack direction="row" alignItems="center">
					{profile && <BntProfileButton profile={profile} onClick={emptyFunction} />}
					<BntTypography variant="body2" color="grey" className={matchesDownSm ? "pl-3" : CommonStrings.EMPTY_STRING}>
						{datetime ? getFormattedDate(datetime) : null}
					</BntTypography>
				</BntStack>
			</Grid>
		</Grid>
	);
};
