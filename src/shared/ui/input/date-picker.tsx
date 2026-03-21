import { FC } from "react";
import { DatePickerElement, DatePickerElementProps } from "react-hook-form-mui";

import { useBntTranslate } from "hooks/use-bnt-translate";

export const BntDatePicker: FC<DatePickerElementProps<any, any> & { stringLabel?: string; name: string } & {}> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, ...rest } = props;
	return (
		<DatePickerElement
			{...rest}
			inputProps={{
				placeholder: translate(stringLabel),
				label: translate(stringLabel),
				variant: "standard",
				InputLabelProps: { shrink: true },
			}}
		/>
	);
};
