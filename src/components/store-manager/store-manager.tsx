import { StoreManagerPure } from "components/store-manager/store-manager-pure";
import { useDonutLoaderList } from "logic/hooks/donut/use-donut-loader-list";
import { useDonutUi } from "logic/ui/use-donut-ui";

export const StoreManager = () => {
	const { objects: donuts } = useDonutLoaderList();
	const { showCreateDonutModal } = useDonutUi();
	return <StoreManagerPure donuts={donuts} onCreateClick={showCreateDonutModal} />;
};
