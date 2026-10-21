import type { FC } from "react";

import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import blackBoxTexts from "../config/black-box-texts";
import type { TBlackBoxResponder } from "../model/black-box.types";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TResponderListProps = {
	responders: Array<TBlackBoxResponder>;
	hasAnswerCounts?: boolean;
};

export const ResponderList: FC<TResponderListProps> = ({ responders, hasAnswerCounts = false }) => {
	const { t } = useBntTranslate();

	return (
		<BntStack direction="column" gap={1.5}>
			{responders.map((responder) => (
				<BntStack key={responder.id} direction="row" alignItems="center" gap={1.25}>
					<ProfileAvatar avatarUrl={responder.avatar} name={responder.full_name} fallback={null} />
					<BntStack direction="column" gap={0} sx={{ minWidth: 0, flex: 1 }}>
						<BntTypography variant="subtitle2" fontWeight={700}>
							{responder.full_name}
						</BntTypography>
						<BntTypography variant="caption" color="text.secondary">
							{responder.position}
						</BntTypography>
					</BntStack>
					{hasAnswerCounts ? (
						<BntTypography variant="caption" color="text.secondary" noWrap>
							{t(blackBoxTexts.answers_count, { count: responder.answers_count })}
						</BntTypography>
					) : null}
				</BntStack>
			))}
		</BntStack>
	);
};
