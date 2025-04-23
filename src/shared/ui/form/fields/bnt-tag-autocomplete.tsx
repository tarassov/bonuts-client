import { FC, SyntheticEvent } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { CommonStrings, Dictionary } from "constants/dictionary";
import { TFormField, TFormFieldSource, TFormFieldSourceItem } from "../types/bnt-form";
import { useBntForm } from "../hooks/use-bnt-form";

export const BntTagAutocomplete: FC<{
	field: TFormField<any>;
	value: Array<TFormFieldSourceItem>;
	id: string;
}> = ({ field, value, id }) => {
	const { source = [], label, placeholder, name, disabled, loading, readOnly } = field;
	const { onChange } = useBntForm();
	const { translate } = useBntTranslate();

	const filteredSource: TFormFieldSource = source.filter(
		(x) => !value.find((y) => y.key === x.key)
	);

	const handleChange = (e: SyntheticEvent, values: TFormFieldSourceItem[]) => {
		onChange(name.toString(), values);
	};

	return (
		<Autocomplete
			multiple
			id={id}
			options={filteredSource}
			getOptionLabel={(option: TFormFieldSourceItem) =>
				option.label || option.key?.toString() || option?.toString()
			}
			value={value}
			loading={loading}
			readOnly={readOnly}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="standard"
					label={translate(label)}
					placeholder={!value ? translate(placeholder) : CommonStrings.EMPTY_STRING}
				/>
			)}
			onChange={handleChange}
			noOptionsText={translate(Dictionary.NO_OPTIONS)}
			disabled={disabled}
		/>
	);
};
