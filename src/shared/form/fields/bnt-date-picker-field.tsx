import { BntDatePicker } from "shared/input/date-picker";
import { CommonStrings } from "constants/dictionary";
import { useBntForm } from "../hooks/use-bnt-form";

export const BntDatePickerField = (props: {
	name: string;
	label?: string;
	required?: boolean;
	disabled?: boolean;
}) => {
	const { name, label, required, disabled } = props;
	const { onChange } = useBntForm();
	const handleChange = (date: Date) => {
		onChange(name, date?.toDateString() || CommonStrings.EMPTY_STRING);
	};
	return (
		<BntDatePicker
			name={name}
			stringLabel={label}
			onChange={handleChange}
			required={required}
			disabled={disabled}
		/>
	);
};
