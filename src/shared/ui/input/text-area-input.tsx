import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import {
	FieldError,
	TextareaAutosizeElement,
	TextareaAutosizeElementProps,
} from "react-hook-form-mui";

export const BntTextAreaInput: FC<
	TextareaAutosizeElementProps & { stringLabel?: string; name: string } & {}
> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, placeholder, onAnimationStart, onBlur, onFocus, name, ...rest } = props;

	return (
		<TextareaAutosizeElement
			{...rest}
			placeholder={translate(placeholder)}
			label={translate(stringLabel)}
			name={name}
			parseError={(error: FieldError) => translate(error.message)}
		/>
	);
};
