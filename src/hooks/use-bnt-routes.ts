import { useCallback, useContext } from "react";
import { AppContext } from "context/app-context";
import { push } from "redux-first-history";

import { useAppDispatch } from "services/redux/store/store";

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
