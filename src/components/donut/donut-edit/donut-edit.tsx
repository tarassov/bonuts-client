import { useParams } from "react-router-dom";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useDonutLoader } from "logic/hooks/donut/use-donut-loader";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { DonutEditForm } from "components/donut/donut-edit/donut-edit-form";
import { useUpdateDonut } from "logic/hooks/donut/use-update-donut";

export const DonutEdit = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLoader(id);
	const { putDonut } = useUpdateDonut();
	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);
	return donut ? (
		<DonutEditForm donut={donut} onSubmit={(values) => putDonut(donut?.id, values)} />
	) : null;
};
