import DashboardPage from "../pages/dashboard-page/dashboard-page";
import HomePage from "../pages/home-page/home-page";
import LoginPage from "../pages/login-page/login-page";
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
