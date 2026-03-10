import { createContext } from "react";

import en from "date-fns/locale/en-GB";

export const LocaleContext = createContext<Locale>(en);
