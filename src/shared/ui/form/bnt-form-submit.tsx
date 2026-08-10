import type { FC } from "react";

import { BntFormCancelButton } from "./bnt-form-cancel-button";
import { BntFormSaveButton } from "./bnt-form-save-button";
import { FormActions } from "./bnt-form-submit.styles";
import { SubmitButtonVariant } from "./types/bnt-form";

export const BntFormSubmit: FC<{
	onCancelClick?: VoidFunction;
	isSticky?: boolean;
	visible?: boolean;
	submitCaption?: string;
	submitButtonVariant?: SubmitButtonVariant;
}> = ({ isSticky, onCancelClick, visible = false, submitCaption, submitButtonVariant = SubmitButtonVariant.default }) => {
	const isBrandGradientButton = submitButtonVariant === SubmitButtonVariant.brandGradient;

	return (
		<FormActions direction="row" justifyContent={isBrandGradientButton ? "flex-end" : "center"} alignItems="center" isSticky={isSticky} spacing={2}>
			{visible && (
				<>
					<BntFormCancelButton onClick={onCancelClick} />

					<BntFormSaveButton isSticky={isSticky} submitButtonVariant={submitButtonVariant} submitCaption={submitCaption} />
				</>
			)}
		</FormActions>
	);
};
