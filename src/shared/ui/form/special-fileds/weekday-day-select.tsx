import type { FC } from "react";
import { useMemo } from "react";
import type { SelectElementProps } from "react-hook-form-mui";

import { getWeekdayOptions } from "@/shared/lib/date";
import { BntSelectElement } from "@/shared/ui/input";

import { useBntTranslate } from "@/hooks/use-bnt-translate";

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
