import { FC } from "react";
import { BntProfileButton } from "components/buttons/profile-button";
import { emptyFunction } from "utils/empty-function";
import { BntStack } from "shared/stack/stack";
import { DonutButton } from "components/buttons/donut-button";
import { texts_t } from "services/localization/texts/texts_t";
import { useFormattedDate } from "hooks/use-formatted-date";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTypography } from "shared/typography/typography";
import { TDonut, TProfile } from "@/types/model";

type RequestContentCellProps = {
	donut?: Pick<TDonut, "logo" | "name">;
	profile?: TProfile;
	datetime?: string;
};
export const RequestContentCell: FC<RequestContentCellProps> = ({ profile, donut, datetime }) => {
	const { translate } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	return (
		<BntStack direction="row" alignItems="center">
			{donut && <DonutButton donut={donut} onClick={emptyFunction} />}
			<BntTypography variant="body2" color="grey.dark">
				{translate(texts_t.to)}
			</BntTypography>
			{profile && <BntProfileButton profile={profile} onClick={emptyFunction} />}
			<BntTypography variant="body2" color="grey">
				{datetime ? getFormattedDate(datetime) : null}
			</BntTypography>
		</BntStack>
	);
};
