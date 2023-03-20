import { useParams } from "react-router-dom";
import { useDonutLogic } from "../../../logic/hooks/use-donut-logic";
import { useLoader } from "../../../base/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "../../../constants/modules";

export const BntDonutPreview = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLogic(id);

	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);

	return <>{donut !== null && donut.name}</>;
};
