import { RequestsList } from "components/request/request-list/request-list";

export const ProfileClosedRequestList = () => {
	return <RequestsList archive my hideActions hideBreadCrumbs />;
};
