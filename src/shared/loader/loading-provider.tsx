import { createContext, FC, useCallback, useMemo, useState } from "react";
import { BntModalLoader } from "./modal-loader";

export const BntSetLoadingContext = createContext<(name: string, value: boolean) => void>(() => {});

export const BntLoadingProvider: FC<{
	children: JSX.Element | Array<JSX.Element>;
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
