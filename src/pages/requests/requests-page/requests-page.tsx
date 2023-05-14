import { FC } from "react";
import { ChildPathMenu } from "components/child-path";
import { requestsRoute } from "routes/routes";

export const RequestsPage: FC = () => {
	return <ChildPathMenu route={requestsRoute} />;
};
