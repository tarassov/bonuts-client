import { createContext } from "react";
import { PickersInputComponentLocaleText } from "@mui/x-date-pickers/locales";

export const PickerLocaleContext = createContext<PickersInputComponentLocaleText<any> | undefined>(
	undefined
);
