import type { FC } from "react";

import { RequestsTab } from "../model/request-feed";

import { RequestsPage } from "./requests-page";

export const ActiveRequestsPage: FC = () => {
	return <RequestsPage initialTab={RequestsTab.Active} />;
};
