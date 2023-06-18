import { StoreManagerPure } from "components/store-manager/store-manager-pure";
import { useDonutList } from "logic/hooks/donut/use-donut-list";
import { useDonutUi } from "logic/ui/use-donut-ui";

export const StoreManager = () => {
	const { objects: donuts } = useDonutList();
	const { showCreateDonutModal } = useDonutUi();
	return <StoreManagerPure donuts={donuts} onCreateClick={showCreateDonutModal} />;
};
