import { RequestPage } from "@mui/icons-material";
import ActiveRequestsPage from "../pages/active-requests-page.tsx/active-requests-page";
import ClosedRequestsPage from "../pages/closed-requests-page/closed-request-page";
import DashboardPage from "../pages/dashboard-page/dashboard-page";
import HomePage from "../pages/home-page/home-page";
import IncomingRequestsPage from "../pages/incoming-requests-page/incomig-requests-page";
import LoginPage from "../pages/login-page/login-page";
import PeoplePage from "../pages/people-page/people-page";
import ProfilePage from "../pages/profile-page/profile-page";
import SettingsPage from "../pages/settings-page/settings-page";

export const loginRoute: TRoute = {
	path: "/login",
	anonymous: true,
	authenticated: false,
	navbarName: "Login",
	hideInMenu: true,
	component: <LoginPage />,
};

export const homeRoute: TRoute = {
	path: "/home",
	anonymous: true,
	authenticated: true,
	navbarName: "Home",
	hideInMenu: true,
	component: <HomePage />,
};

export const dashBoardRoute: TRoute = {
	path: "/dashboard",
	anonymous: false,
	authenticated: true,
	navbarName: "Dashboard",
	hideInMenu: false,
	component: <DashboardPage />,
	redirect: loginRoute,
};

export const settingsRoute: TRoute = {
	path: "/settings",
	anonymous: false,
	authenticated: true,
	navbarName: "Settings",
	hideInMenu: false,
	component: <SettingsPage />,
	redirect: loginRoute,
};

export const profileRoute: TRoute = {
	path: "/my",
	anonymous: false,
	authenticated: true,
	navbarName: "Profile",
	hideInMenu: false,
	component: <ProfilePage />,
	redirect: loginRoute,
};
export const peopleRoute: TRoute = {
	path: "/people",
	anonymous: false,
	authenticated: true,
	navbarName: "Employees",
	hideInMenu: false,
	component: <PeoplePage />,
};

export const requestsRoute: TRoute = {
	path: "/requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Requests",
	hideInMenu: false,
	component: <RequestPage />,
};

export const incomingRequestsRoute: TRoute = {
	path: "/incoming_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Incoming requests",
	hideInMenu: false,
	component: <IncomingRequestsPage />,
	parentRoute: requestsRoute,
};
export const activeRequestsRoute: TRoute = {
	path: "/active_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Active requests",
	hideInMenu: false,
	component: <ActiveRequestsPage />,
	parentRoute: requestsRoute,
};

export const closedRequestsRoute: TRoute = {
	path: "/closed_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Closed requests",
	hideInMenu: false,
	component: <ClosedRequestsPage />,
	parentRoute: requestsRoute,
};
