import { Modules } from "constants/modules";

import { useModuleLoader } from "@/shared/ui/loader";

import { useDonut, useDonutsFeed, useDonutUi } from "@/entities/donut";

import type { TDonut } from "@/types/model";

export function useStorePage() {
	const { donuts, fetchNext, hasNext, isFetching, isLoading } = useDonutsFeed(true);
	const { putDonut, isUpdating } = useDonut();
	const { showCreateDonutModal } = useDonutUi();

	useModuleLoader({ module: Modules.StoreManager, isLoading: isLoading || isUpdating });

	const handleToggleUseRemains = (donut: TDonut) => {
		putDonut(donut.id, { ...donut, use_remains: !donut.use_remains });
	};

	return { donuts, fetchNext, handleToggleUseRemains, hasNext, isFetching, showCreateDonutModal };
}
