import { ChangeEvent } from "react";
import { BntTextAreaInput } from "shared/input/text-area-input";
import { TFormValue } from "shared/form/types/bnt-form";
import { useBntForm } from "../hooks/use-bnt-form";

export const BntTextAreaField = (props: {
	name: string;
	id?: string;
	placeholder?: string | undefined;
	label?: string;
	value?: TFormValue;
	maxRows?: number;
	minRows?: number;
	rows?: number;
	required?: boolean;
	disabled?: boolean;
}) => {
	const { name, id, placeholder, label, maxRows, minRows, value, required, disabled, rows } = props;
	const { onChange } = useBntForm();

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(name, e.target.value);
	};
	return (
		<BntTextAreaInput
			name={name}
			id={id}
			placeholder={placeholder}
			stringLabel={label}
			value={value?.toString()}
			onChange={handleChange}
			required={required}
			minRows={minRows}
			maxRows={maxRows}
			disabled={disabled}
			rows={rows || 10}
		/>
	);
};
