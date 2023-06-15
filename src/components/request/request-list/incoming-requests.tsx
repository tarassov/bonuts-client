import { RequestsList } from "components/request/request-list/request-list";
import { useRequestLogic } from "logic/hooks/request/use-request-logic";

export const IncomingRequests = () => {
	const { refundRequest, activateRequest } = useRequestLogic();

	return <RequestsList onRollback={refundRequest} onCheck={activateRequest} incoming />;
};
