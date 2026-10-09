import type { FC } from "react";

import { BntFormCancelButton } from "./bnt-form-cancel-button";
import { BntFormSaveButton } from "./bnt-form-save-button";
import { FormActions } from "./bnt-form-submit.styles";
import { SubmitButtonVariant } from "./types/bnt-form";

export const BntFormSubmit: FC<{
	isDisabled?: boolean;
	onCancelClick?: VoidFunction;
	isSticky?: boolean;
	visible?: boolean;
	submitCaption?: string;
	submitButtonVariant?: SubmitButtonVariant;
}> = ({ isDisabled = false, isSticky, onCancelClick, visible = false, submitCaption, submitButtonVariant = SubmitButtonVariant.default }) => {
	const isBrandGradientButton = submitButtonVariant === SubmitButtonVariant.brandGradient;
	const isContainedButton = submitButtonVariant === SubmitButtonVariant.contained;
	const hasProminentSubmit = isBrandGradientButton || isContainedButton;

	return (
		<FormActions direction="row" justifyContent={hasProminentSubmit ? "flex-end" : "center"} alignItems="center" isContained={isContainedButton} isSticky={isSticky} spacing={2}>
			{visible && (
				<>
					<BntFormCancelButton isOutlined={isContainedButton} onClick={onCancelClick} />

					<BntFormSaveButton isDisabled={isDisabled} isSticky={isSticky} submitButtonVariant={submitButtonVariant} submitCaption={submitCaption} />
				</>
			)}
		</FormActions>
	);
};
