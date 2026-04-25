import { FC } from "react";
import { FieldError, RadioButtonGroup } from "react-hook-form-mui";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TFormField } from "../types/bnt-form";

export const BntRadioField: FC<{
	field: TFormField<any>;
}> = ({ field }) => {
	const { translate } = useBntTranslate();
	const { name, disabled, label, required } = field;

	if (!field.source) return null;
	return (
		<RadioButtonGroup
			required={required}
			label={label}
			valueKey="key"
			name={name?.toString()}
			disabled={disabled}
			options={field.source}
			parseError={(error: FieldError) => translate(error.message)}
		/>
	);
};
