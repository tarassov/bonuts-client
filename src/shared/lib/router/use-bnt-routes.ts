import { useCallback, useContext } from "react";
import { push } from "redux-first-history";

import { useAppDispatch } from "services/redux/store/store";

import { RouterContext } from "./router-context";

export const useBntRoutes = () => {
	const dispatch = useAppDispatch();
	const { routes } = useContext(RouterContext);
	const navigate = useCallback(
		(path: string) => {
			dispatch(push(path));
		},
		[dispatch]
	);

	return { navigate, routes };
};
