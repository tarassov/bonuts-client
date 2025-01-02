import { FC, useMemo } from "react";
import { SelectElementProps } from "react-hook-form-mui";
import { BntSelectElement } from "shared/ui/input/select-element";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { getWeekdayOptions } from "shared/lib/get-weekday";

export const WeekdayDaySelect: FC<
	SelectElementProps<any, any> & { stringLabel?: string; name: string; maxWidth?: string }
> = (props) => {
	const { maxWidth = "300px", ...rest } = props;
	const { t } = useBntTranslate();
	const options = useMemo(() => {
		return getWeekdayOptions().map((x) => {
			return { id: x.id, label: t(x.label, { capitalize: true }) };
		});
	}, []);
	return <BntSelectElement {...rest} options={options} style={{ maxWidth }} />;
};
