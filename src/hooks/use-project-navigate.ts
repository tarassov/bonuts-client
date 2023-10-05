import { useAppDispatch } from "services/redux/store/store";
import { push } from "redux-first-history";
import { BntRoutes } from "routes/config/routes";
import { routesPath } from "routes/config/routes-path";

export const useProjectNavigate = () => {
	const dispatch = useAppDispatch();
	const navigateToLogin = () => {
		dispatch(push(routesPath[BntRoutes.Login]));
	};

	const navigateToSignUp = () => {
		dispatch(push(routesPath[BntRoutes.Registration]));
	};
	const navigateToRoot = () => {
		dispatch(push("/"));
	};

	return { navigateToLogin, navigateToSignUp, navigateToRoot };
};
