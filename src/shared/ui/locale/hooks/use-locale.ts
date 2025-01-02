import { useContext } from "react";
import { LocaleContext } from "shared/ui/locale/locale-context";

export const useLocale = () => {
	return useContext(LocaleContext);
};
