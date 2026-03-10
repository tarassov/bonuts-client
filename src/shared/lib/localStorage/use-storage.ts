import { useMemo } from "react";

import { useLocalStorage } from "usehooks-ts";

export type TBasicStorageConfig = Record<string, string | number | boolean | null>;
type TStorageSettings = Record<string, unknown>;

export function useStorage<TConfig extends TBasicStorageConfig, TKey extends Extract<keyof TConfig, string>>(
	name: TKey,
	initialValue: TConfig[TKey]
) {
	const [settings, setSettings] = useLocalStorage<TStorageSettings>("settings", {});

	const value = useMemo(() => {
		return (settings[name] as TConfig[TKey] | undefined) ?? initialValue;
	}, [initialValue, name, settings]);

	const setValue = (nextValue: TConfig[TKey]) => {
		setSettings((prev) => ({
			...prev,
			[name]: nextValue,
		}));
	};

	return [value, setValue] as const;
}
