import {
	Dashboard,
	RequestPage,
	RestorePage,
	Settings,
	Person,
	LogoutOutlined,
	DonutSmall,
	Shop,
	ShoppingBag,
} from "@mui/icons-material";
import ActiveRequestsPage from "../pages/requests/active-requests-page.tsx/active-requests-page";
import ClosedRequestsPage from "../pages/requests/closed-requests-page/closed-request-page";
import Index from "../pages/dashboard-page";
import HomePage from "../pages/home-page/home-page";
import IncomingRequestsPage from "../pages/requests/incoming-requests-page/incomig-requests-page";
import LoginPage from "../pages/login-page/login-page";
import PeoplePage from "../pages/people-page/people-page";
import ProfilePage from "../pages/profile-page/profile-page";
import SettingsPage from "../pages/settings-page/settings-page";
import MyRequestsPage from "../pages/requests/my-requests-page/my-requests-page";
import TenantsListPage from "../pages/tenants-list-page/tenants-list-page";
import StatisticsPage from "../pages/statistics-page/statistics-page";
import DonutsPage from "../pages/donut/donuts-page";
import AccountOperationsPage from "../pages/account-operations-page/account-operations-page";
import LogOutPage from "../pages/logout-page/logout-page";
import RegistrationPage from "../pages/registration-page/registration-page";
import RecoverPage from "../pages/recover-page/recover-page";
import NotFoundPage from "../pages/not-found-page/not-found-page";
import BntDonutPreviewPage from "../pages/donut/donut-preview-page";
// import Dashboard from "@material-ui/icons/Dashboard";

export const notFoundRoute: TRoute = {
	path: "/404",
	anonymous: true,
	authenticated: true,
	hideInMenu: true,
	component: <NotFoundPage />,
};
export const loginRoute: TRoute = {
	path: "/login",
	anonymous: true,
	authenticated: false,
	hideInMenu: true,
	component: <LoginPage />,
};
export const registrationRoute: TRoute = {
	path: "/registration",
	anonymous: true,
	authenticated: false,
	hideInMenu: true,
	component: <RegistrationPage />,
};
export const recoverRoute: TRoute = {
	path: "/recover",
	anonymous: true,
	authenticated: false,
	hideInMenu: true,
	component: <RecoverPage />,
};
export const restoreRoute: TRoute = {
	path: "/restore",
	anonymous: true,
	authenticated: false,
	hideInMenu: true,
	component: <RestorePage />,
};
export const logoutRoute: TRoute = {
	path: "/logout",
	anonymous: false,
	authenticated: true,
	navbarName: "Exit",
	hideInMenu: false,
	component: <LogOutPage />,
	icon: <LogoutOutlined />,
	index: 100,
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
	component: <Index />,
	redirect: loginRoute,
	icon: <Dashboard />,
	index: 0,
};

export const settingsRoute: TRoute = {
	path: "/settings",
	anonymous: false,
	authenticated: true,
	navbarName: "Settings",
	hideInMenu: false,
	component: <SettingsPage />,
	redirect: loginRoute,
	icon: <Settings />,
};

export const profileRoute: TRoute = {
	path: "/my",
	anonymous: false,
	authenticated: true,
	navbarName: "Profile",
	hideInMenu: false,
	component: <ProfilePage />,
	redirect: loginRoute,
	icon: <Person />,
	index: 1,
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

export const myRequestsRoute: TRoute = {
	path: "/my_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "My requests",
	hideInMenu: false,
	component: <MyRequestsPage />,
};

export const tenantsListRoute: TRoute = {
	path: "/tenants_list",
	anonymous: false,
	authenticated: true,
	navbarName: "My tenants",
	hideInMenu: false,
	component: <TenantsListPage />,
};

export const statisticsRoute: TRoute = {
	path: "/statistic",
	anonymous: false,
	authenticated: true,
	navbarName: "Statistic",
	hideInMenu: false,
	component: <StatisticsPage />,
};

export const donutsRoute: TRoute = {
	path: "/donuts",
	anonymous: false,
	authenticated: true,
	navbarName: "Store",
	hideInMenu: false,
	component: <DonutsPage />,
	icon: <ShoppingBag />,
	index: 2,
};
export const accountOperationsRoute: TRoute = {
	path: "/account/:id",
	anonymous: false,
	authenticated: true,
	hideInMenu: false,
	component: <AccountOperationsPage />,
};

export const donutPreviewRoute: TRoute = {
	path: "/d/:id",
	anonymous: false,
	authenticated: true,
	hideInMenu: true,
	component: <BntDonutPreviewPage />,
};
