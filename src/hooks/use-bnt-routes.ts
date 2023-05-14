import { useAppDispatch } from "services/redux/store/store";
import { push } from "redux-first-history";
import { useCallback, useContext } from "react";
import { BntRoutes } from "routes/config/routes";
import { AppContext } from "context/app-context";

export const getRouteIndex = (route: TRoute<BntRoutes>): number => {
	return route.index !== undefined ? route.index : 10;
};

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
