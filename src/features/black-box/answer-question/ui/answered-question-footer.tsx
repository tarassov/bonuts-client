import type { FC } from "react";
import { PublicOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";

import { blackBoxTexts } from "@/entities/black-box";

import { FooterRoot, VisibilityLine } from "./answered-question-footer.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TAnsweredQuestionFooterProps = {
	isBusy: boolean;
	canEdit: boolean;
	onEdit: () => void;
};

export const AnsweredQuestionFooter: FC<TAnsweredQuestionFooterProps> = ({ isBusy, canEdit, onEdit }) => {
	const { t } = useBntTranslate();

	return (
		<FooterRoot>
			<VisibilityLine>
				<PublicOutlined />
				{t(blackBoxTexts.visibility_published)}
			</VisibilityLine>
			{canEdit ? (
				<BntButton variant="text" noTransform disabled={isBusy} onClick={onEdit}>
					{t(blackBoxTexts.edit_answer)}
				</BntButton>
			) : null}
		</FooterRoot>
	);
};
