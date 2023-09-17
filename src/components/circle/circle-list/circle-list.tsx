import { useCircleLoaderList } from "logic/hooks/cirlce/use-circle-loader-list";
import { CircleListStyled } from "components/circle/circle-list/circle-list-styled";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "constants/modules";

export const CircleList = () => {
	const { objects: circles, isLoading } = useCircleLoaderList();
	const { setLoading } = useLoader();

	useEffect(() => {
		setLoading(Modules.Circles, isLoading);
	}, [isLoading]);
	return <CircleListStyled circles={circles} />;
};
