import type { FC } from "react";

import { RequestsTab } from "../model/request-feed";

import { RequestsPage } from "./requests-page";

export const ClosedRequestsPage: FC = () => {
	return <RequestsPage initialTab={RequestsTab.Closed} />;
};
