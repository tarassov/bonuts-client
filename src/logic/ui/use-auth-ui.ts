import { push } from "redux-first-history";
import { useAppDispatch } from "services/redux/store/store";
import { routesPath } from "routes/config/routes-path";

export const useAuthUi = () => {
	const dispatch = useAppDispatch();
	const showRegister = () => {
		dispatch(push(routesPath.Registration));
	};

	return { showRegister };
};
