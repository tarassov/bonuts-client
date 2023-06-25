import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { DatePickerElement, DatePickerElementProps } from "react-hook-form-mui";

export const BntDatePicker: FC<
	DatePickerElementProps<any, any> & { stringLabel?: string; name: string } & {}
> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, ...rest } = props;
	return (
		<DatePickerElement
			{...rest}
			inputProps={{
				placeholder: translate(stringLabel),
				label: translate(stringLabel),
				variant: "standard",
			}}
		/>
	);
};
