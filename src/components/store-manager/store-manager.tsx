import { StoreManagerPure } from "components/store-manager/store-manager-pure";
import { useDonutList } from "logic/hooks/donut/use-donut-list";

export const StoreManager = () => {
	const { objects: donuts } = useDonutList();
	return <StoreManagerPure donuts={donuts} />;
};
