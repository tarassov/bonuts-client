import { format, utcToZonedTime } from "date-fns-tz";
import { getLocalTimeZone } from "utils/getLocalTimeZone";
import { useLocale } from "shared/ui/locale/hooks/use-locale";

export const useLocalDate = () => {
	const locale = useLocale();
	const formatDate = (isoDate?: string) => {
		if (!isoDate) return "";
		return format(utcToZonedTime(isoDate, getLocalTimeZone()), "Pp", { locale });
	};

	return { formatDate };
};
