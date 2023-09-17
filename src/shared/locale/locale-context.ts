import { createContext } from "react";
import en from "date-fns/locale/en-US";

export const LocaleContext = createContext<Locale>(en);
