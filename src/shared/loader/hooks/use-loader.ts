import { useCallback, useContext, useEffect } from "react";
import { BntSetLoadingContext } from "../loading-provider";

export const useLoader = (name: string, isLoading: boolean = false) => {
	const setLoading = useContext(BntSetLoadingContext);
	useEffect(() => {
		setLoading(name, isLoading);
		return () => setLoading(name, false);
	}, [isLoading]);

	const openLoader = useCallback(() => {
		setLoading(name, true);
	}, []);

	const closeLoader = useCallback(() => {
		setLoading(name, false);
	}, []);

	return { openLoader, closeLoader };
};
