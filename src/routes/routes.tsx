import {
	LogoutOutlined,
	ForwardToInboxOutlined,
	PeopleAltOutlined,
	PersonOutlined,
	SettingsOutlined,
	ShoppingBagOutlined,
	DashboardOutlined,
	LeaderboardOutlined,
	Diversity2Outlined,
	InboxOutlined,
	ArchiveOutlined,
} from "@mui/icons-material";

import {
	AccountOperationsPage,
	ActiveRequestsPage,
	ClosedRequestsPage,
	DashboardPage,
	DonutPreviewPage,
	DonutsPage,
	HomePage,
	IncomingRequestsPage,
	LoginPage,
	LogoutPage,
	MyRequestsPage,
	NotFoundPage,
	PeoplePage,
	ProfilePage,
	RecoverPage,
	RegistrationPage,
	RequestsPage,
	RestorePasswordPage,
	SettingsPage,
	StatisticsPage,
	TenantsListPage,
} from "@/pages";

// import Dashboard from "@material-ui/icons/Dashboard";

export const notFoundRoute: TRoute = {
	path: "/404",
	anonymous: true,
	authenticated: true,
	hideInMenu: true,
	// eslint-disable-next-line react/jsx-no-undef
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
	component: <RestorePasswordPage />,
};
export const logoutRoute: TRoute = {
	path: "/logout",
	anonymous: false,
	authenticated: true,
	navbarName: "Exit",
	hideInMenu: false,
	component: <LogoutPage />,
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
	component: <DashboardPage />,
	redirect: loginRoute,
	icon: <DashboardOutlined />,
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
	icon: <SettingsOutlined />,
};

export const profileRoute: TRoute = {
	path: "/my",
	anonymous: false,
	authenticated: true,
	navbarName: "Profile",
	hideInMenu: false,
	component: <ProfilePage />,
	redirect: loginRoute,
	icon: <PersonOutlined />,
	index: 1,
};
export const peopleRoute: TRoute = {
	path: "/people",
	anonymous: false,
	authenticated: true,
	navbarName: "Employees",
	hideInMenu: false,
	component: <PeoplePage />,
	icon: <PeopleAltOutlined />,
};

export const requestsRoute: TRoute = {
	path: "/requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Requests",
	hideInMenu: false,
	component: <RequestsPage />,
	icon: <ForwardToInboxOutlined />,
};

export const incomingRequestsRoute: TRoute = {
	path: "/incoming_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Incoming requests",
	hideInMenu: false,
	component: <IncomingRequestsPage />,
	icon: <ForwardToInboxOutlined />,
	parentRoute: requestsRoute,
	index: 0,
};
export const activeRequestsRoute: TRoute = {
	path: "/active_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Active requests",
	hideInMenu: false,
	component: <ActiveRequestsPage />,
	icon: <InboxOutlined />,
	parentRoute: requestsRoute,
	index: 1,
};

export const closedRequestsRoute: TRoute = {
	path: "/closed_requests",
	anonymous: false,
	authenticated: true,
	navbarName: "Closed requests",
	hideInMenu: false,
	component: <ClosedRequestsPage />,
	parentRoute: requestsRoute,
	icon: <ArchiveOutlined />,
	index: 2,
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
	icon: <Diversity2Outlined />,
};

export const statisticsRoute: TRoute = {
	path: "/statistic",
	anonymous: false,
	authenticated: true,
	navbarName: "Statistic",
	hideInMenu: false,
	component: <StatisticsPage />,
	icon: <LeaderboardOutlined />,
};

export const donutsRoute: TRoute = {
	path: "/donuts",
	anonymous: false,
	authenticated: true,
	navbarName: "Store",
	hideInMenu: false,
	component: <DonutsPage />,
	icon: <ShoppingBagOutlined />,
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
	component: <DonutPreviewPage />,
};
