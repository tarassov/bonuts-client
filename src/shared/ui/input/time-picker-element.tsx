import { forwardRef } from "react";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { usePickerLocale } from "@/shared/ui/locale";

import type { TimePickerElementProps } from "react-hook-form-mui/date-pickers";
import { TimePickerElement } from "react-hook-form-mui/date-pickers";

export const BntTimePickerElement = forwardRef<
	HTMLInputElement,
	TimePickerElementProps<any, any> & {
		stringLabel?: string;
		name: string;
		fullWidth?: boolean;
	}
>((props, ref) => {
	const { translate } = useBntTranslate();
	const pickerLocale = usePickerLocale();

	const { stringLabel, fullWidth, ...rest } = props;
	return (
		<TimePickerElement
			{...rest}
			localeText={pickerLocale}
			inputProps={{
				fullWidth,
				placeholder: translate(stringLabel),
				label: translate(stringLabel),
				variant: "standard",
			}}
			ref={ref}
		/>
	);
});
