import {
	dashBoardRoute,
	homeRoute,
	loginRoute,
	profileRoute,
	settingsRoute,
} from "./routes";

export const routes: Array<TRoute> = [
	homeRoute,
	loginRoute,
	dashBoardRoute,
	settingsRoute,
	profileRoute,
];

export const loginRedirect = loginRoute;
