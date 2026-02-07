import { useCallback, useContext, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

import { BntSetLoadingContext } from "../loading-provider";

export const useLoader = (name: string, isLoading: boolean = false, openDebounceMs: number = 200) => {
	const setLoading = useContext(BntSetLoadingContext);

	const debouncedOpen = useMemo(() => {
		return debounce(() => {
			setLoading(name, true);
		}, openDebounceMs);
	}, [name, openDebounceMs, setLoading]);

	useEffect(() => {
		return () => {
			debouncedOpen.cancel();
		};
	}, [debouncedOpen]);

	const openLoader = useCallback(() => {
		debouncedOpen();
	}, [debouncedOpen]);

	const closeLoader = useCallback(() => {
		debouncedOpen.cancel(); // prevents pending open from firing after close
		setLoading(name, false);
	}, [debouncedOpen, name, setLoading]);

	useEffect(() => {
		if (isLoading) debouncedOpen();

		return () => {
			debouncedOpen.cancel();
			setLoading(name, false);
		};
	}, [debouncedOpen, isLoading, name, setLoading]);

	return { openLoader, closeLoader };
};
