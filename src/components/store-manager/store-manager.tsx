import { StoreManagerPure } from "components/store-manager/store-manager-pure";
import { Modules } from "constants/modules";
import { useModuleLoader } from "shared/ui/loader/hooks/use-module-loader";

import { useDonutLoaderList } from "@/entities/donut";

import { useDonutUi } from "logic/ui/use-donut-ui";

function StoreManager() {
	const { objects: donuts, isLoading } = useDonutLoaderList(true);
	useModuleLoader({ module: Modules.StoreManager, isLoading });
	const { showCreateDonutModal } = useDonutUi();
	return <StoreManagerPure donuts={donuts} onCreateClick={showCreateDonutModal} />;
}
export default StoreManager;
