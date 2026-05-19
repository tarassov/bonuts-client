import type { FC } from "react";

import { RequestsPage } from "./requests-page";

export const MyRequestsPage: FC = () => {
	return <RequestsPage initialTab="active" variant="my" />;
};
