import { BntRoutes } from "routes/config/routes";
import { redirectConfig } from "routes/config/redirects-config";
import { routesPath } from "routes/config/routes-path";
import {
	ArchiveOutlined,
	CalendarMonthOutlined,
	DashboardOutlined,
	Diversity2Outlined,
	ExtensionOutlined,
	ForwardToInboxOutlined,
	InboxOutlined,
	LeaderboardOutlined,
	LogoutOutlined,
	PeopleAltOutlined,
	PersonOutlined,
	SettingsOutlined,
	ShareOutlined,
	ShoppingBagOutlined,
	StarBorderOutlined,
	StoreMallDirectoryOutlined,
	WidgetsOutlined,
} from "@mui/icons-material";
import { SharePage } from "pages/share-page/share-page";
import { TenantPage } from "pages/tenant-page/tenant-page";
import { PluginsPage } from "pages/plugins-page/plugins-page";
import { SchedulersPage } from "pages/schedulers-page/schedulers-page";
import { EmployeePreviewPage } from "pages/employee/employee-preview-page";
import { DonutEditPage } from "pages/donut/donut-edit-page";
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
	EmployeesPage,
	ProfilePage,
	RecoverPage,
	RegistrationPage,
	RequestsPage,
	RestorePasswordPage,
	SettingsPage,
	StatisticsPage,
	StorePage,
	TenantsListPage,
} from "@/pages";

const routes: { [name in BntRoutes]?: TRoute<BntRoutes> } = {
	AccountOperations: {
		path: routesPath[BntRoutes.AccountOperations],
		anonymous: false,
		authenticated: true,
		hideInMenu: false,
		component: <AccountOperationsPage />,
	},
	Dashboard: {
		path: routesPath[BntRoutes.Dashboard],
		anonymous: false,
		authenticated: true,
		navbarName: "Dashboard",
		hideInMenu: false,
		component: <DashboardPage />,
		redirect: routesPath[BntRoutes.Login],
		icon: <DashboardOutlined />,
		index: 0,
	},
	DonutPreview: {
		path: routesPath[BntRoutes.DonutPreview],
		anonymous: false,
		authenticated: true,
		hideInMenu: true,
		component: <DonutPreviewPage />,
	},
	DonutEdit: {
		path: routesPath[BntRoutes.DonutEdit],
		anonymous: false,
		authenticated: true,
		hideInMenu: true,
		component: <DonutEditPage />,
	},
	Donuts: {
		path: routesPath[BntRoutes.Donuts],
		anonymous: false,
		authenticated: true,
		navbarName: "Store",
		hideInMenu: false,
		component: <DonutsPage />,
		icon: <ShoppingBagOutlined />,
		index: 2,
	},
	Home: {
		path: routesPath[BntRoutes.Home],
		anonymous: true,
		authenticated: true,
		navbarName: "Home",
		hideInMenu: true,
		component: <HomePage />,
	},

	Login: {
		path: routesPath[BntRoutes.Login],
		anonymous: true,
		authenticated: false,
		hideInMenu: true,
		component: <LoginPage />,
	},
	Logout: {
		path: routesPath[BntRoutes.Logout],
		anonymous: false,
		authenticated: true,
		navbarName: "Exit",
		hideInMenu: false,
		component: <LogoutPage />,
		icon: <LogoutOutlined />,
		index: 100,
	},
	MyRequests: {
		path: routesPath[BntRoutes.MyRequests],
		anonymous: false,
		authenticated: true,
		navbarName: "My requests",
		hideInMenu: false,
		icon: <StarBorderOutlined />,
		component: <MyRequestsPage />,
	},
	Employees: {
		path: routesPath[BntRoutes.Employees],
		anonymous: false,
		authenticated: true,
		navbarName: "Employees",
		hideInMenu: false,
		component: <EmployeesPage />,
		icon: <PeopleAltOutlined />,
	},
	EmployeePreview: {
		path: routesPath[BntRoutes.EmployeePreview],
		anonymous: false,
		authenticated: true,
		hideInMenu: true,
		component: <EmployeePreviewPage />,
	},
	Profile: {
		path: routesPath[BntRoutes.Profile],
		anonymous: false,
		authenticated: true,
		navbarName: "Profile",
		hideInMenu: false,
		component: <ProfilePage />,
		redirect: routesPath[BntRoutes.Login],
		icon: <PersonOutlined />,
		index: 1,
	},
	Recover: {
		path: routesPath[BntRoutes.Recover],
		anonymous: true,
		authenticated: false,
		hideInMenu: true,
		component: <RecoverPage />,
	},
	Registration: {
		path: routesPath[BntRoutes.Registration],
		anonymous: true,
		authenticated: false,
		hideInMenu: true,
		component: <RegistrationPage />,
	},
	Requests: {
		path: routesPath[BntRoutes.Requests],
		anonymous: false,
		authenticated: true,
		navbarName: "Requests",
		hideInMenu: false,
		component: <RequestsPage />,
		icon: <ForwardToInboxOutlined />,
		children: {
			IncomingRequests: {
				path: routesPath[BntRoutes.IncomingRequests],
				anonymous: false,
				authenticated: true,
				navbarName: "Incoming requests",
				hideInMenu: false,
				component: <IncomingRequestsPage />,
				icon: <ForwardToInboxOutlined />,
				index: 0,
			},

			ActiveRequests: {
				path: routesPath[BntRoutes.ActiveRequests],
				anonymous: false,
				authenticated: true,
				navbarName: "Active requests",
				hideInMenu: false,
				component: <ActiveRequestsPage />,
				icon: <InboxOutlined />,
				index: 1,
			},
			ClosedRequests: {
				path: "/closed_requests",
				anonymous: false,
				authenticated: true,
				navbarName: "Closed requests",
				hideInMenu: false,
				component: <ClosedRequestsPage />,
				icon: <ArchiveOutlined />,
				index: 2,
			},
		},
	},
	Restore: {
		path: routesPath[BntRoutes.Restore],
		anonymous: true,
		authenticated: false,
		hideInMenu: true,
		component: <RestorePasswordPage />,
	},
	Settings: {
		path: routesPath[BntRoutes.Settings],
		anonymous: false,
		authenticated: true,
		navbarName: "Settings",
		hideInMenu: false,
		component: <SettingsPage />,
		redirect: routesPath[BntRoutes.Login],
		icon: <SettingsOutlined />,
		children: {
			Share: {
				path: routesPath[BntRoutes.Share],
				anonymous: false,
				authenticated: true,
				navbarName: "Share all",
				hideInMenu: false,
				component: <SharePage />,
				redirect: routesPath[BntRoutes.Login],
				icon: <ShareOutlined />,
			},
			Store: {
				path: routesPath[BntRoutes.Store],
				anonymous: false,
				authenticated: true,
				navbarName: "Store",
				hideInMenu: false,
				component: <StorePage />,
				icon: <StoreMallDirectoryOutlined />,
				index: 0,
			},
			Tenant: {
				path: routesPath[BntRoutes.Tenant],
				anonymous: false,
				authenticated: true,
				navbarName: "Tenant",
				hideInMenu: false,
				component: <TenantPage />,
				icon: <WidgetsOutlined />,
				index: 0,
			},
			Plugins: {
				path: routesPath[BntRoutes.Plugins],
				anonymous: false,
				authenticated: true,
				navbarName: "Plugins",
				hideInMenu: false,
				component: <PluginsPage />,
				icon: <ExtensionOutlined />,
				index: 0,
			},
			Schedulers: {
				path: routesPath[BntRoutes.Schedulers],
				anonymous: false,
				authenticated: true,
				navbarName: "Schedulers",
				hideInMenu: false,
				component: <SchedulersPage />,
				icon: <CalendarMonthOutlined />,
				index: 0,
			},
		},
	},

	Statistics: {
		path: routesPath[BntRoutes.Statistics],
		anonymous: false,
		authenticated: true,
		navbarName: "Statistic",
		hideInMenu: false,
		component: <StatisticsPage />,
		icon: <LeaderboardOutlined />,
	},
	TenantList: {
		path: routesPath[BntRoutes.TenantList],
		anonymous: false,
		authenticated: true,
		navbarName: "My tenants",
		hideInMenu: false,
		component: <TenantsListPage />,
		icon: <Diversity2Outlined />,
	},
};

export const routesConfig: TRouteConfig<BntRoutes> = {
	redirects: redirectConfig,
	routes,
};
