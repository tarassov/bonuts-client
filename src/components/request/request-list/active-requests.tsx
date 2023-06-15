import { RequestsList } from "components/request/request-list/request-list";
import { useRequestLogic } from "logic/hooks/request/use-request-logic";

export const ActiveRequests = () => {
	const { rollbackRequest, closeRequest } = useRequestLogic();

	return <RequestsList onRollback={rollbackRequest} onCheck={closeRequest} active />;
};
