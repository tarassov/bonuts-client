import type { FC } from "react";

import { useFormattedDate } from "@/shared/lib/date";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import blackBoxTexts from "../config/black-box-texts";
import type { TBlackBoxProfile } from "../model/black-box.types";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

const ANSWER_DATE_FORMAT = { day: "numeric", month: "long" } as const;

type TAnswererRowProps = {
	/** Null once the responder's profile was deactivated; the answer itself stays. */
	answerer: TBlackBoxProfile | null;
	answeredAt: string;
};

export const AnswererRow: FC<TAnswererRowProps> = ({ answerer, answeredAt }) => {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const name = answerer?.full_name ?? t(blackBoxTexts.answerer_left);
	const details = [answerer?.position, getFormattedDate(answeredAt, ANSWER_DATE_FORMAT)].filter(Boolean).join(" · ");

	return (
		<BntStack direction="row" alignItems="center" gap={1.25}>
			<ProfileAvatar avatarUrl={answerer?.avatar} name={answerer?.full_name} fallback={null} />
			<BntStack direction="column" gap={0} sx={{ minWidth: 0 }}>
				<BntTypography variant="subtitle2" fontWeight={700}>
					{name}
				</BntTypography>
				<BntTypography variant="caption" color="text.secondary">
					{details}
				</BntTypography>
			</BntStack>
		</BntStack>
	);
};
