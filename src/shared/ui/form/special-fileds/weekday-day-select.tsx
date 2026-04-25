import type { FC } from "react";
import { useMemo } from "react";
import type { SelectElementProps } from "react-hook-form-mui";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntSelectElement } from "shared/ui/input/select-element";

import { getWeekdayOptions } from "@/shared/lib/date";

export const WeekdayDaySelect: FC<SelectElementProps<any, any> & { stringLabel?: string; name: string; maxWidth?: string }> = (props) => {
	const { maxWidth = "300px", ...rest } = props;
	const { t } = useBntTranslate();
	const options = useMemo(() => {
		return getWeekdayOptions().map((x) => {
			return { id: x.id, label: t(x.label, { capitalize: true }) };
		});
	}, []);
	return <BntSelectElement {...rest} options={options} style={{ maxWidth }} />;
};
