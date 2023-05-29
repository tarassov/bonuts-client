import { FC } from "react";
import { TBntBreadcrumpItem } from "shared/types/breadcrumbs";
import { routesPath } from "routes/config/routes-path";
import { BntRoutes } from "routes/config/routes";
import { texts_p } from "services/localization/texts/texts_p";
import { PeopleAltOutlined, PersonOutlined } from "@mui/icons-material";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrump";
import { TProfile } from "@/types/model";

export const EmployeePreviewBreadcrumbs: FC<{ employee?: TProfile }> = ({ employee }) => {
	const breadcrumbs: Array<TBntBreadcrumpItem> = [
		{
			key: routesPath[BntRoutes.Employees],
			link: routesPath[BntRoutes.Employees],
			label: texts_p.profiles,
			icon: <PeopleAltOutlined color="info" />,
		},
		{
			key: employee?.id.toString() || "employee",
			label: employee?.user_name || "",
			icon: <PersonOutlined color="info" />,
		},
	];

	return <BntBreadcrumbs items={breadcrumbs} className="mb-2" />;
};
