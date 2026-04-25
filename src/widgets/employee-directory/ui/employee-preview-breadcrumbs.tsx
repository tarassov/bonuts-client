import type { FC } from "react";
import { PeopleAltOutlined, PersonOutlined } from "@mui/icons-material";

import { BntRoutes } from "@/shared/config/routes";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb/breadcrumbs";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";

import { routesPath } from "@/routes/config/routes-path";
import { texts_e } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

type TEmployeePreviewBreadcrumbsProps = {
	employee?: TProfile;
};

export const EmployeePreviewBreadcrumbs: FC<TEmployeePreviewBreadcrumbsProps> = ({ employee }) => {
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: routesPath[BntRoutes.Employees],
			link: routesPath[BntRoutes.Employees],
			label: texts_e.employees,
			icon: <PeopleAltOutlined />,
		},
		{
			key: employee?.id.toString() || "employee",
			label: employee?.user_name || "",
			icon: <PersonOutlined />,
			noTranslation: true,
		},
	];

	return <BntBreadcrumbs items={breadcrumbs} className="mb-2" />;
};
