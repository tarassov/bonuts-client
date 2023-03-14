import { FC, SyntheticEvent, useEffect, useState } from "react";
import {
	TFormField,
	TFormFieldSource,
	TFormFieldSourceItem,
} from "../types/bnt-form";
import { Autocomplete, TextField } from "@mui/material";
import { useBntTranslate } from "../../../hooks/useBntTranslate";
import { Dictionary } from "../../../constants/dictionary";
import { BntFormProvider } from "../context/bnt-form-provider";
import { useBntForm } from "../hooks/use-bnt-form";

export const BntTagAutocomplete: FC<{
	field: TFormField;
	value: Array<string | number>;
	id: string;
}> = ({ field, value, id }) => {
	const { source = [], label, placeholder, name, disabled } = field;
	const [current, setCurrent] = useState<Array<TFormFieldSourceItem>>([]);
	const { translate } = useBntTranslate();
	const { onChange } = useBntForm();

	useEffect(() => {
		if (value) {
			const values: Array<TFormFieldSourceItem> = value.reduce((acc, curr) => {
				if (curr) {
					const option: TFormFieldSourceItem = {
						key: curr,
						label: source.find((x) => x.key === curr)?.label,
					};
					acc.push(option);
				}
				return acc;
			}, [] as Array<TFormFieldSourceItem>);
			setCurrent(values);
		}
	}, [value]);

	const filteredSource: TFormFieldSource = source.filter(
		(x) => !current.find((y) => y.key === x.key)
	);

	const handleChange = (e: SyntheticEvent, values: TFormFieldSourceItem[]) => {
		const newValues = values.map((v) => v.key);
		onChange(name, newValues);
	};

	return (
		<Autocomplete
			multiple
			id={id}
			options={filteredSource}
			getOptionLabel={(option: TFormFieldSourceItem) =>
				option.label || option.key.toString()
			}
			value={current}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="standard"
					label={translate(label)}
					placeholder={translate(placeholder)}
				/>
			)}
			onChange={handleChange}
			noOptionsText={translate(Dictionary.NO_OPTIONS)}
			disabled={disabled}
		/>
	);
};
