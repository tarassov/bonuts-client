import { useParams } from "react-router-dom";
import { useDonutLogic } from "../../../logic/hooks/use-donut-logic";
import { useLoader } from "../../../shared/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "../../../constants/modules";
import { TBntBreadcrumpItem } from "../../../shared/types/breadcrumbs";
import { Dictionary } from "../../../constants/dictionary";
import { DonutSmall, ShoppingBag } from "@mui/icons-material";
import { BntBreadcrumbs } from "../../../shared/breadcrumb/breadcrump";

export const BntDonutPreview = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { donut, isLoading } = useDonutLogic(id);

	useEffect(() => {
		setLoading(Modules.DonutPreview, isLoading);
	}, [isLoading]);
	const breadcrumbs: Array<TBntBreadcrumpItem> = [
		{
			key: "shop",
			link: "/donuts",
			label: Dictionary.DONUTS,
			icon: <ShoppingBag color={"info"} />,
		},
		{
			key: id || "donut",
			label: donut?.name || "",
			icon: <DonutSmall color={"info"} />,
		},
	];
	return (
		<>
			<BntBreadcrumbs items={breadcrumbs} className={"mb-10"} />
			{donut !== null && donut.name}
		</>
	);
};
