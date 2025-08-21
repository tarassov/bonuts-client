import { useModuleLoader } from "shared/ui/loader/hooks/use-module-loader";

import { Modules } from "constants/modules";

import { useDonutUi } from "logic/ui/use-donut-ui";

import { StoreManagerPure } from "components/store-manager/store-manager-pure";

import { useDonutLoaderList } from "@/entities/donut";

function StoreManager() {
	const { objects: donuts, isLoading } = useDonutLoaderList(true);
	useModuleLoader({ module: Modules.StoreManager, isLoading });
	const { showCreateDonutModal } = useDonutUi();
	return <StoreManagerPure donuts={donuts} onCreateClick={showCreateDonutModal} />;
}
export default StoreManager;
