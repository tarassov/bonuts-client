import { useCircleLoaderList } from "logic/hooks/cirlce/use-circle-loader-list";
import { CircleListStyled } from "components/circle/circle-list/circle-list-styled";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";

export const CircleList = () => {
	const { objects: circles, isLoading } = useCircleLoaderList();
	useLoader(Modules.Circles, isLoading);

	return <CircleListStyled circles={circles} />;
};
