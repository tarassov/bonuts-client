import { useFormattedDate } from "@/shared/lib/date";

import { getAskedOnLabel } from "./asked-on-label";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

const DATE_FORMAT = { day: "numeric", month: "long" } as const;

export const useAskedOnLabel = (askedOn: string): string => {
	const { t } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const label = getAskedOnLabel(askedOn, new Date());

	if ("date" in label) return getFormattedDate(label.date, DATE_FORMAT);

	return t(label.key, { count: label.count });
};
