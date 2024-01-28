import { FC } from "react";
import { FieldError, RadioButtonGroup } from "react-hook-form-mui";
import { TFormField } from "shared/form/types/bnt-form";
import { useBntTranslate } from "hooks/use-bnt-translate";

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
