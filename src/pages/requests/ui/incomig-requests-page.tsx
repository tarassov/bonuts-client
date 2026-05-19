import type { FC } from "react";

import { RequestsPage } from "./requests-page";

export const IncomingRequestsPage: FC = () => {
	return <RequestsPage initialTab="incoming" />;
};
