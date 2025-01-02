import { useCallback } from "react";

export const useFormattedDate = () => {
	const getFormattedDate = useCallback((datetime: string) => datetime, []);

	return { getFormattedDate };
};
