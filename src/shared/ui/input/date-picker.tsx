import type { FC } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";

import type { DatePickerElementProps } from "react-hook-form-mui/date-pickers";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";

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
