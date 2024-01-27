import { FC } from "react";
import { SelectElement, SelectElementProps } from "react-hook-form-mui";
import { useBntTranslate } from "hooks/use-bnt-translate";

export const BntSelectElement: FC<
	SelectElementProps<any, any> & { stringLabel?: string; name: string }
> = (props) => {
	const { translate } = useBntTranslate();

	const { stringLabel, label, ...rest } = props;
	return (
		<SelectElement
			{...rest}
			variant="standard"
			label={label || translate(stringLabel)}
			inputProps={{
				placeholder: translate(stringLabel),
				label: translate(stringLabel),
				variant: "standard",
			}}
		/>
	);
};
