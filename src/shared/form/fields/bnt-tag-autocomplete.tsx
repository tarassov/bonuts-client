import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { CommonStrings, Dictionary } from "constants/dictionary";
import { TFormField, TFormFieldSource, TFormFieldSourceItem } from "../types/bnt-form";
import { useBntForm } from "../hooks/use-bnt-form";

export const BntTagAutocomplete: FC<{
	field: TFormField<any>;
	value: Array<string | number>;
	id: string;
}> = ({ field, value, id }) => {
	const { source = [], label, placeholder, name, disabled, loading } = field;
	const [current, setCurrent] = useState<Array<TFormFieldSourceItem>>([]);
	const { translate } = useBntTranslate();
	const { onChange, initialValues } = useBntForm();

	useEffect(() => {
		if (value) {
			const values: Array<TFormFieldSourceItem> = value.reduce((acc, curr) => {
				const combinedSource = source?.length
					? source
					: initialValues[field.name.toString()].map(field.valueToOption);
				if (curr) {
					const option: TFormFieldSourceItem = {
						key: curr,
						label: combinedSource?.length
							? combinedSource.find((x: TFormFieldSourceItem) => x.key === curr)?.label
							: curr.toString(),
					};
					acc.push(option);
				}
				return acc;
			}, [] as Array<TFormFieldSourceItem>);
			setCurrent(values);
		}
	}, [value, source, initialValues]);

	const filteredSource: TFormFieldSource = source.filter(
		(x) => !current.find((y) => y.key === x.key)
	);

	const handleChange = (e: SyntheticEvent, values: TFormFieldSourceItem[]) => {
		const newValues = values.map((v) => v.key);
		onChange(name.toString(), newValues);
	};

	return (
		<Autocomplete
			multiple
			id={id}
			options={filteredSource}
			getOptionLabel={(option: TFormFieldSourceItem) => option.label || option.key.toString()}
			value={current}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="standard"
					label={translate(label)}
					placeholder={!current ? translate(placeholder) : CommonStrings.EMPTY_STRING}
				/>
			)}
			onChange={handleChange}
			noOptionsText={translate(Dictionary.NO_OPTIONS)}
			disabled={disabled}
		/>
	);
};
