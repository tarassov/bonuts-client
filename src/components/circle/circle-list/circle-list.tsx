import { useCircleLoaderList } from "logic/hooks/cirlce/use-circle-loader-list";
import { CircleListStyled } from "components/circle/circle-list/circle-list-styled";

export const CircleList = () => {
	const { objects: circles } = useCircleLoaderList();
	return <CircleListStyled circles={circles} />;
};
