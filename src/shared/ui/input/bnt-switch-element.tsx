import { forwardRef } from "react";
import { SwitchElement, SwitchElementProps } from "react-hook-form-mui";

import { useBntTranslate } from "hooks/use-bnt-translate";

export const BntSwitchElement = forwardRef<
	HTMLLabelElement,
	Omit<SwitchElementProps, "label"> & { stringLabel?: string }
>(({ stringLabel, ...rest }, ref) => {
	const { t } = useBntTranslate();
	return <SwitchElement {...rest} ref={ref} label={t(stringLabel)} />;
});
