import { FC } from "react";
import { FieldError, TextareaAutosizeElement, TextareaAutosizeElementProps } from "react-hook-form-mui";

import { useBntTranslate } from "hooks/use-bnt-translate";

export const BntTextAreaInput: FC<TextareaAutosizeElementProps & { stringLabel?: string; name: string } & {}> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, placeholder, onAnimationStart, onBlur, onFocus, name, ...rest } = props;
	const translatedLabel = translate(stringLabel);
	const translatedPlaceholder = translate(placeholder);

	return (
		<TextareaAutosizeElement
			{...rest}
			placeholder={translatedPlaceholder}
			label={translatedLabel}
			name={name}
			parseError={(error: FieldError) => translate(error.message)}
			inputProps={{ "aria-label": translatedLabel || translatedPlaceholder, ...rest.inputProps }}
			InputLabelProps={{ shrink: true, ...rest.InputLabelProps }}
			variant="standard"
		/>
	);
};
