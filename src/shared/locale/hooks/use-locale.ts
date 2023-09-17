import { useContext } from "react";
import { LocaleContext } from "shared/locale/locale-context";

export const useLocale = () => {
	return useContext(LocaleContext);
};
