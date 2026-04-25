import { useContext } from "react";

import { DateLocaleContext } from "../locale-context";

export const useDateLocale = () => {
	return useContext(DateLocaleContext);
};
