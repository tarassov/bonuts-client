import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TextareaAutosizeElement, TextareaAutosizeElementProps } from "react-hook-form-mui";

export const BntTextAreaInput: FC<
	TextareaAutosizeElementProps & { stringLabel?: string; name: string } & {}
> = (props) => {
	const { translate } = useBntTranslate();
	const { stringLabel, placeholder, name, ...rest } = props;

	return <TextareaAutosizeElement {...rest} placeholder={translate(placeholder)} name={name} />;
};
