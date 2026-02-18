import { RequestsList } from "components/request/request-list/request-list";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts";

import { useRequestLogic } from "logic/hooks/request/use-request-logic";

export const ProfileActiveRequestList = () => {
	const { refundRequest } = useRequestLogic();
	const { t } = useBntTranslate();

	return (
		<RequestsList
			active
			incoming
			my
			onRollback={refundRequest}
			checkRollbackEnabled={(request) => request.status === 0}
			checkCheckEnabled={() => false}
			hideBreadCrumbs
			rollbackTooltip={t(texts_c.cancel, { capitalize: true })}
		/>
	);
};
