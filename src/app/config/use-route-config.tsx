import { useMemo } from "react";
import {
	ArchiveOutlined,
	CalendarMonthOutlined,
	DashboardOutlined,
	Diversity2Outlined,
	ExtensionOutlined,
	ForwardToInboxOutlined,
	InboxOutlined,
	LeaderboardOutlined,
	LibraryAddOutlined,
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

import { BntRoutes } from "@/shared/config/routes";

import { AccountOperationsPage } from "@/pages/account-operations-page";
import { CirclesPage } from "@/pages/circles-page";
import { ConfirmEmailPage } from "@/pages/confirm-email-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { DonutEditPage, DonutPreviewPage, DonutsPage } from "@/pages/donut";
import { EmployeePreviewPage, EmployeesPage } from "@/pages/employee";
import { EventPage } from "@/pages/event-page";
import { HomePage } from "@/pages/home-page";
import { InvitationPage, InvitationsAllPage } from "@/pages/invitation";
import { LoginPage } from "@/pages/login-page";
import { LogoutPage } from "@/pages/logout-page";
import { NewUserPage } from "@/pages/new-user-page";
import { PluginsPage } from "@/pages/plugins-page";
import { ProfilePage } from "@/pages/profile-page";
import { RecoverPage } from "@/pages/recover-page";
import { RegistrationPage } from "@/pages/registration-page";
import { ActiveRequestsPage, ClosedRequestsPage, IncomingRequestsPage, MyRequestsPage, RequestsPage } from "@/pages/requests";
import { SchedulersPage } from "@/pages/schedulers-page";
import { SettingsPage } from "@/pages/settings-page";
import { SharePage } from "@/pages/share-page";
import { StatisticsPage } from "@/pages/statistics-page";
import { StorePage } from "@/pages/store-page";
import { TenantPage } from "@/pages/tenant-page";
import { TenantsListPage } from "@/pages/tenants-list-page";
import { VkCallbackPage } from "@/pages/vk-callback";

import { Roles } from "@/constants/roles";
import { useIcons } from "@/hooks/use-icons";
import { redirectConfig } from "@/routes/config/redirects-config";
import { routesPath } from "@/routes/config/routes-path";

const groupAdmins = [Roles.moderator, Roles.admin, Roles.admin];

export const useRouteConfig = (): TRouteConfig<BntRoutes> => {
	const { CirclesIcon } = useIcons();

	const routes = useMemo(
		() =>
			({
				AccountOperations: {
					path: routesPath[BntRoutes.AccountOperations],
					anonymous: false,
					authenticated: true,
					hideInMenu: false,
					component: <AccountOperationsPage />,
				},
				ConfirmEmail: {
					path: routesPath[BntRoutes.ConfirmEmail],
					anonymous: true,
					authenticated: false,
					hideInMenu: false,
					component: <ConfirmEmailPage />,
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
					roles: groupAdmins,
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
					tenantNotRequired: true,
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
				Event: {
					path: routesPath[BntRoutes.Event],
					anonymous: false,
					authenticated: true,
					hideInMenu: true,
					component: <EventPage />,
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
				RequestRecover: {
					path: routesPath[BntRoutes.RequestRecover],
					anonymous: true,
					authenticated: false,
					hideInMenu: true,
					component: <RecoverPage />,
				},
				Recover: {
					path: routesPath[BntRoutes.Recover],
					anonymous: true,
					authenticated: false,
					hideInMenu: true,
					component: <RecoverPage />,
				},
				Invitations: {
					path: routesPath[BntRoutes.Invitations],
					anonymous: false,
					authenticated: true,
					navbarName: "Invitations",
					hideInMenu: false,
					component: <InvitationPage />,
					icon: <LibraryAddOutlined />,
					roles: groupAdmins,
				},
				InvitationsAll: {
					path: routesPath[BntRoutes.InvitationsAll],
					anonymous: false,
					authenticated: true,
					hideInMenu: true,
					component: <InvitationsAllPage />,
					roles: groupAdmins,
				},
				NewUser: {
					path: routesPath[BntRoutes.NewUser],
					anonymous: false,
					authenticated: true,
					navbarName: "Dashboard",
					hideInMenu: false,
					component: <NewUserPage />,
					icon: <DashboardOutlined />,
					tenantNotRequired: true,
					index: 0,
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
					roles: groupAdmins,
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
							roles: groupAdmins,
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
							roles: groupAdmins,
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
							roles: groupAdmins,
						},
					},
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
					roles: groupAdmins,
					children: {
						Share: {
							path: routesPath[BntRoutes.Share],
							anonymous: false,
							authenticated: true,
							navbarName: "Transfer donuts or coins",
							hideInMenu: false,
							component: <SharePage />,
							redirect: routesPath[BntRoutes.Login],
							icon: <ShareOutlined />,
							roles: groupAdmins,
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
							roles: groupAdmins,
						},
						Tenant: {
							path: routesPath[BntRoutes.Tenant],
							anonymous: false,
							authenticated: true,
							navbarName: "Team settings",
							hideInMenu: false,
							component: <TenantPage />,
							icon: <WidgetsOutlined />,
							index: 0,
							roles: groupAdmins,
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
							roles: groupAdmins,
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
							roles: groupAdmins,
						},
						Circles: {
							path: routesPath[BntRoutes.Circles],
							anonymous: false,
							authenticated: true,
							navbarName: "Circles",
							hideInMenu: false,
							component: <CirclesPage />,
							icon: <CirclesIcon />,
							index: 0,
							roles: groupAdmins,
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
					roles: [Roles.moderator, Roles.admin, Roles.admin],
				},
				TenantList: {
					path: routesPath[BntRoutes.TenantList],
					anonymous: false,
					authenticated: true,
					navbarName: "My tenants",
					hideInMenu: false,
					component: <TenantsListPage />,
					icon: <Diversity2Outlined />,
					tenantNotRequired: true,
				},
				VkCallback: {
					path: routesPath[BntRoutes.VkCallback],
					anonymous: false,
					hideInMenu: true,
					component: <VkCallbackPage />,
					authenticated: false,
					public: true,
					isRoot: true,
				},
			}) satisfies { [name in BntRoutes]?: TRoute<BntRoutes> },
		[]
	);

	return useMemo(
		() => ({
			redirects: redirectConfig,
			routes,
		}),
		[routes]
	);
};
