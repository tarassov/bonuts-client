import type { FC, ReactNode } from "react";
import { createContext, useCallback, useMemo, useState } from "react";

import { emptyFunction } from "utils/empty-function";

import { BntModalLoader } from "./modal-loader";

export const BntSetLoadingContext = createContext<(name: string, value: boolean) => void>(emptyFunction);

export const BntLoadingProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [loading, setLoading] = useState<Record<string, boolean>>({});

	const handleLoading = useCallback((name: string, value: boolean) => {
		setLoading((prev) => {
			return { ...prev, [name]: value };
		});
	}, []);

	const isLoading = useMemo(() => {
		return Object.values(loading).some((x) => x);
	}, [loading]);

	return (
		<BntSetLoadingContext.Provider value={handleLoading}>
			<BntModalLoader loading={isLoading} />
			{children}
		</BntSetLoadingContext.Provider>
	);
};
