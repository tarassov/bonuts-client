import { useContext } from "react";
import { BntSetLoadingContext } from "../loading-provider";

export const useLoader = () => {
	const setLoading = useContext(BntSetLoadingContext);
	return { setLoading };
};
