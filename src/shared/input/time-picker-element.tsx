import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TimePickerElement, TimePickerElementProps } from "react-hook-form-mui";
import { usePickerLocale } from "shared/locale/hooks/use-picker-locale";

export const BntTimePickerElement: FC<
	TimePickerElementProps<any, any> & {
		stringLabel?: string;
		name: string;
		fullWidth?: boolean;
	} & {}
> = (props) => {
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
		/>
	);
};
