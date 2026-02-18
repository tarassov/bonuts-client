import { CircleListPure } from "components/circle/circle-list/circle-list-pure";
import { Modules } from "constants/modules";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { useCircleLoaderList } from "logic/hooks/cirlce/use-circle-loader-list";

export const CircleList = () => {
	const { objects: circles, isLoading } = useCircleLoaderList();
	useLoader(Modules.Circles, isLoading);

	return <CircleListPure circles={circles} />;
};
