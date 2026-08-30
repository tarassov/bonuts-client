import RedeemOutlined from "@mui/icons-material/RedeemOutlined";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_s } from "services/localization/texts";

import { BntButton, BntTransparentButton } from "@/shared/ui/buttons";

import { BrandIconCircle, BrandSubmitButton } from "./bnt-form-submit.styles";
import { SubmitButtonVariant } from "./types/bnt-form";

type TBntFormSaveButtonProps = {
	isSticky?: boolean;
	submitCaption?: string;
	submitButtonVariant: SubmitButtonVariant;
};

export const BntFormSaveButton = ({ isSticky, submitCaption, submitButtonVariant }: TBntFormSaveButtonProps) => {
	const { translate } = useBntTranslate();
	const saveCaption = submitCaption || translate(texts_s.save);

	if (isSticky) {
		return (
			<BntButton color="primary" data-testid="form-submit-button" noTransform type="submit" variant="contained">
				{saveCaption}
			</BntButton>
		);
	}

	if (submitButtonVariant === SubmitButtonVariant.brandGradient) {
		return (
			<BrandSubmitButton
				data-testid="form-submit-button"
				type="submit"
				startIcon={
					<BrandIconCircle>
						<RedeemOutlined />
					</BrandIconCircle>
				}
			>
				{saveCaption}
			</BrandSubmitButton>
		);
	}

	if (submitButtonVariant === SubmitButtonVariant.contained) {
		return (
			<BntButton color="primary" data-testid="form-submit-button" noTransform type="submit" variant="contained">
				{saveCaption}
			</BntButton>
		);
	}

	return (
		<BntTransparentButton data-testid="form-submit-button" type="submit">
			{saveCaption}
		</BntTransparentButton>
	);
};
