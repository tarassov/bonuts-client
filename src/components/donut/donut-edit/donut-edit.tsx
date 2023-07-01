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
import { TDonut } from "@/types/model";

export const DonutEdit = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading, refetch } = useDonutLoader(id);
	const { putDonut } = useUpdateDonut();
	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);

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
	return donut ? <DonutEditForm donut={donut} onSubmit={onSubmit} /> : null;
};
