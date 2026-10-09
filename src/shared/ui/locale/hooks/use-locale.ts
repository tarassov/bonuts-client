import { useContext } from "react";

import { LocaleContext } from "../locale-context";

export const useLocale = () => {
	return useContext(LocaleContext);
};
