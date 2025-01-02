import { useParams } from "react-router-dom";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { useDonutLoader } from "logic/hooks/donut/use-donut-loader";
import { Modules } from "constants/modules";
import { DonutEditForm } from "components/donut/donut-edit/donut-edit-form";
import { useDonut } from "logic/hooks/donut/use-donut";
import { PutDonutsByIdApiResponse } from "services/api/bonuts-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { TBntBreadcrumbItem } from "shared/ui/types/breadcrumbs-types";
import { Dictionary } from "constants/dictionary";
import { DonutSmall, SettingsOutlined } from "@mui/icons-material";
import { routesPath } from "routes/config/routes-path";
import { BntBreadcrumbs } from "shared/ui/breadcrumb/breadcrumbs";
import { BntCardBody } from "shared/ui/card/card-body";
import { BntCard } from "shared/ui/card/card";
import { TDonut } from "@/types/model";

export const DonutEdit = () => {
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
		| Promise<
				| { data: PutDonutsByIdApiResponse }
				| { error: FetchBaseQueryError | SerializedError }
				| undefined
		  >
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
};
