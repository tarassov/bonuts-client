import { useWatch } from "react-hook-form";

import { BntSwitchElement } from "@/shared/ui/input";

export const BntSwitchField = (props: { name: string; id?: string; label?: string; disabledLabel?: string; disabled?: boolean }) => {
	const { name, id, label, disabled, disabledLabel } = props;
	const value = useWatch({ name });

	const switchLabel = value ? label : disabledLabel || label;

	return <BntSwitchElement stringLabel={switchLabel} name={name} disabled={disabled} id={id} />;
};
