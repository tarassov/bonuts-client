import { createContext } from "react";

import type { TPluginState } from "./plugin-types";

export const PluginContext = createContext<TPluginState | null>(null);
