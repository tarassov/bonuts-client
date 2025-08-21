import { useParams } from "react-router-dom";
import { DonutSmall, SettingsOutlined } from "@mui/icons-material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { routesPath } from "routes/config/routes-path";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";

import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { BntCard } from "shared/ui/card/card";
import { BntCardBody } from "shared/ui/card/card-body";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Dictionary } from "constants/dictionary";
import { Modules } from "constants/modules";

import { PutDonutsByIdApiResponse } from "services/api/bonuts-api";

import { DonutEditForm } from "components/donut/donut-edit/donut-edit-form";

import { useDonut } from "@/entities/donut";
import { useDonutLoader } from "@/entities/donut/model/use-donut-loader";
import { TDonut } from "@/types/model";

export function DonutEdit() {
	const { id } = useParams();

	const { donut, isLoading, refetch } = useDonutLoader(id);
	const { putDonut } = useDonut();

	useLoader(Modules.DonutPreview, isLoading);

	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "shop",
			link: routesPath.Store,
			label: Dictionary.DONUTS,
			icon: <SettingsOutlined />,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall />,
		},
	];

	const onSubmit = (
		values: TDonut
	):
		| Promise<{ data: PutDonutsByIdApiResponse } | { error: FetchBaseQueryError | SerializedError } | undefined>
		| undefined => {
		if (donut) {
			return putDonut(donut?.id, { ...values }, { onSuccess: () => refetch() });
		}
		return undefined;
	};
	return (
		<>
			<BntBreadcrumbs items={breadcrumbs} className="mb-3" />
			<BntCard>
				<BntCardBody className="m-3 p-3">
					{donut ? <DonutEditForm donut={donut} onSubmit={onSubmit} /> : null}
				</BntCardBody>
			</BntCard>
		</>
	);
}
