import { useContext } from "react";
import { PickerLocaleContext } from "shared/locale/picker-locale-context";

export const usePickerLocale = () => {
	return useContext(PickerLocaleContext);
};
