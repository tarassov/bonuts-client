import { useCircleLoaderList } from "logic/hooks/cirlce/use-circle-loader-list";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { CircleListPure } from "components/circle/circle-list/circle-list-pure";

export const CircleList = () => {
	const { objects: circles, isLoading } = useCircleLoaderList();
	useLoader(Modules.Circles, isLoading);

	return <CircleListPure circles={circles} />;
};
