import React, { FC, Suspense } from "react";
// import { StoreManager } from "components/store-manager/store-manager";

const StoreManager = React.lazy(() => import("components/store-manager/store-manager"));
export const StorePage: FC = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<StoreManager />
		</Suspense>
	);
};
