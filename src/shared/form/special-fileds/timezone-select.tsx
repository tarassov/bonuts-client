import { forwardRef } from "react";
import { AutocompleteElement, SelectElementProps } from "react-hook-form-mui";
import { useTimezone } from "shared/form/hooks/use-timezone";
import { useBntTranslate } from "hooks/use-bnt-translate";

export type TimezoneSelectProps = SelectElementProps<any, any> & {
	stringLabel?: string;
	name: string;
	className?: string;
};
export const TimezoneSelect = forwardRef<HTMLInputElement, TimezoneSelectProps>((props, ref) => {
	const { stringLabel, placeholder, className, ...rest } = props;
	const { options, parseTimezone } = useTimezone();
	const { translate } = useBntTranslate();

	return (
		<AutocompleteElement
			autocompleteProps={{
				isOptionEqualToValue: (option, value) => option.value === value.value,
				value: props?.value ? parseTimezone(props?.value as any) : undefined,
				className,
			}}
			{...rest}
			label={translate(stringLabel)}
			options={options}
			textFieldProps={{ variant: "standard", placeholder: translate(placeholder) }}
			ref={ref}
		/>
	);
});
