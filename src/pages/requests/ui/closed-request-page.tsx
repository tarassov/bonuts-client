import type { FC } from "react";

import { RequestsPage } from "./requests-page";

export const ClosedRequestsPage: FC = () => {
	return <RequestsPage initialTab="closed" />;
};
