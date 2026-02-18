import { useCallback, useContext } from "react";
import { push } from "redux-first-history";

import { useAppDispatch } from "services/redux/store/store";

import { AppContext } from "context/app-context";

export const useBntRoutes = () => {
	const dispatch = useAppDispatch();
	const { routes } = useContext(AppContext);
	const navigate = useCallback(
		(path: string) => {
			dispatch(push(path));
		},
		[dispatch]
	);

	return { navigate, routes };
};
