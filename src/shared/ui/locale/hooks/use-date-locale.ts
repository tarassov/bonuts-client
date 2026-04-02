import { useContext } from "react";

import { DateLocaleContext } from "shared/ui/locale/locale-context";

export const useDateLocale = () => {
	return useContext(DateLocaleContext);
};
