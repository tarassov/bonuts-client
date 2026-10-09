import type { FC } from "react";

import { RequestsTab, RequestsView } from "../model/request-feed";

import { RequestsPage } from "./requests-page";

export const MyRequestsPage: FC = () => {
	return <RequestsPage initialTab={RequestsTab.Active} variant={RequestsView.My} />;
};
