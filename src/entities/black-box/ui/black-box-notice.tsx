import type { FC } from "react";

import { BntTypography } from "@/shared/ui/typography";

import { NoticeCard } from "./black-box-notice.styles";

type TBlackBoxNoticeProps = {
	text: string;
};

/** A calm one-sentence card for the states where the black box has nothing to show or offer. */
export const BlackBoxNotice: FC<TBlackBoxNoticeProps> = ({ text }) => (
	<NoticeCard elevation={0} variant="outlined">
		<BntTypography variant="body2">{text}</BntTypography>
	</NoticeCard>
);
