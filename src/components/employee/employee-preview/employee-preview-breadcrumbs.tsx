import { FC } from "react";
import { TBntBreadcrumbItem } from "shared/types/breadcrumbs";
import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";
import { PeopleAltOutlined, PersonOutlined } from "@mui/icons-material";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrumbs";
import { texts_e } from "services/localization/texts";
import { TProfile } from "@/types/model";

export const EmployeePreviewBreadcrumbs: FC<{ employee?: TProfile }> = ({ employee }) => {
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: routesPath[BntRoutes.Employees],
			link: routesPath[BntRoutes.Employees],
			label: texts_e.employees,
			icon: <PeopleAltOutlined color="info" />,
		},
		{
			key: employee?.id.toString() || "employee",
			label: employee?.user_name || "",
			icon: <PersonOutlined color="info" />,
			noTranslation: true,
		},
	];

	return <BntBreadcrumbs items={breadcrumbs} className="mb-2" />;
};
