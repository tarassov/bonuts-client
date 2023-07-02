import { useBntTranslate } from "hooks/use-bnt-translate";
import { SwitchElement } from "react-hook-form-mui";

export const BntSwitchField = (props: {
	name: string;
	id?: string;
	label?: string;
	disabled?: boolean;
}) => {
	const { name, id, label, disabled } = props;

	const { t } = useBntTranslate();

	return <SwitchElement label={t(label)} name={name} disabled={disabled} id={id} />;
};
