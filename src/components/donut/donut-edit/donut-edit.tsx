import { useParams } from "react-router-dom";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useDonutLogic } from "logic/hooks/donut/use-donut-logic";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { DonutEditForm } from "components/donut/donut-edit/donut-edit-form";
import { emptyFunction } from "utils/empty-function";

export const DonutEdit = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLogic(id);
	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);
	return donut ? <DonutEditForm donut={donut} onSubmit={emptyFunction} /> : null;
};
