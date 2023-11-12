import { BntRoutes } from "routes/config/routes";

export const routesPath: Record<BntRoutes, string> = {
	Home: "/home",
	AccountOperations: "/account/:id",
	ActiveRequests: "active_requests",
	ClosedRequests: "closed_request",
	Dashboard: "/",
	DonutPreview: "/d/:id",
	DonutEdit: "/donut_edit/:id",
	Donuts: "/donuts",
	MyRequests: "/my_requests",
	IncomingRequests: "/incoming_requests",
	Login: "/login",
	Logout: "/logout",
	Employees: "/employees",
	EmployeePreview: "/e/:id",
	Event: "/event/:id",
	Plugins: "/plugins",
	Profile: "/my",
	RequestRecover: "/recover_password",
	Recover: "/recover_password/:token",
	Registration: "/registration",
	Requests: "/requests",
	Schedulers: "/schedulers",
	Settings: "/settings",
	Share: "/share",
	Statistics: "/statistic",
	Store: "/store-manager",
	Tenant: "/tenant",
	TenantList: "/tenants_list",
	Circles: "/circles",
	ConfirmEmail: "/confirm_email/:token",
	Invitations: "/invitations",
};
