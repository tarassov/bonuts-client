import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { BntSwitchElement } from "@/shared/ui/input";

export const BntSwitchField = (props: { name: string; id?: string; label?: string; disabledLabel?: string; disabled?: boolean }) => {
	const { name, id, label, disabled, disabledLabel } = props;
	const { getValues } = useFormContext();

	const { t } = useBntTranslate();

	const value = getValues(name);

	const switchLabel = useMemo(() => {
		return value ? label : disabledLabel || label;
	}, [value]);

	return <BntSwitchElement stringLabel={t(switchLabel)} name={name} disabled={disabled} id={id} />;
};
