import { StoreManagerPure } from "components/store-manager/store-manager-pure";
import { useDonutLoaderList } from "logic/hooks/donut/use-donut-loader-list";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { useModuleLoader } from "shared/loader/hooks/use-module-loader";
import { Modules } from "constants/modules";

const StoreManager = () => {
	const { objects: donuts, isLoading } = useDonutLoaderList(true);
	useModuleLoader({ module: Modules.StoreManager, isLoading });
	const { showCreateDonutModal } = useDonutUi();
	return <StoreManagerPure donuts={donuts} onCreateClick={showCreateDonutModal} />;
};
export default StoreManager;
