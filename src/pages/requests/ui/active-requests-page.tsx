import type { FC } from "react";

import { RequestsPage } from "./requests-page";

export const ActiveRequestsPage: FC = () => {
	return <RequestsPage initialTab="active" />;
};
