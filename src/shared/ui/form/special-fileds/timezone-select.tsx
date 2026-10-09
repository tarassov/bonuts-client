import { forwardRef } from "react";
import type { AutocompleteElementProps } from "react-hook-form-mui";
import { AutocompleteElement } from "react-hook-form-mui";

import { useBntTranslate } from "hooks/use-bnt-translate";

import type { ITimezoneOption } from "@/shared/ui/types";

import { useTimezone } from "../hooks/use-timezone";

type TTimezoneAutocompleteProps = AutocompleteElementProps<ITimezoneOption, false, false, false>;

export type TimezoneSelectProps = Omit<TTimezoneAutocompleteProps, "label" | "options"> & {
	stringLabel?: string;
	name: string;
	className?: string;
	placeholder?: string;
	fullWidth?: boolean;
	value?: ITimezoneOption | string;
};
export const TimezoneSelect = forwardRef<HTMLDivElement, TimezoneSelectProps>((props, ref) => {
	const { stringLabel, placeholder, className, fullWidth, ...rest } = props;
	const { options, parseTimezone } = useTimezone();
	const { translate } = useBntTranslate();

	return (
		<AutocompleteElement
			autocompleteProps={{
				isOptionEqualToValue: (option, value) => option.value === value.value,
				fullWidth,
				value: props.value ? parseTimezone(props.value) || null : undefined,
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
