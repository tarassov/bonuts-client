import { useParams } from "react-router-dom";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useDonutLoader } from "logic/hooks/donut/use-donut-loader";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { DonutEditForm } from "components/donut/donut-edit/donut-edit-form";
import { useUpdateDonut } from "logic/hooks/donut/use-update-donut";
import { PutDonutsByIdApiResponse } from "services/api/bonuts-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { TBntBreadcrumbItem } from "shared/types/breadcrumbs";
import { Dictionary } from "constants/dictionary";
import { DonutSmall, SettingsOutlined } from "@mui/icons-material";
import { routesPath } from "routes/config/routes-path";
import { BntBreadcrumbs } from "shared/breadcrumb/breadcrumbs";
import { BntCardBody } from "shared/card/card-body";
import { BntCard } from "shared/card/card";
import { TDonut } from "@/types/model";

export const DonutEdit = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading, refetch } = useDonutLoader(id);
	const { putDonut } = useUpdateDonut();
	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);

	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "shop",
			link: routesPath.Store,
			label: Dictionary.DONUTS,
			icon: <SettingsOutlined color="info" />,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall color="info" />,
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
