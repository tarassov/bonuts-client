import { forwardRef } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TimePickerElement, TimePickerElementProps } from "react-hook-form-mui";
import { usePickerLocale } from "shared/ui/locale/hooks/use-picker-locale";

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
