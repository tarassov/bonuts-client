import { useContext } from "react";

import { PickerLocaleContext } from "../picker-locale-context";

export const usePickerLocale = () => {
	return useContext(PickerLocaleContext);
};
