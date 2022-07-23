import { dashBoardRoute, loginRoute } from "./routes";

export const loginRedirect: TRedirect = {
	from: loginRoute,
	to: dashBoardRoute,
	authenticated: true,
};
