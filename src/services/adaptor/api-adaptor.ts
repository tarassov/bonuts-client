import { apiDonutsToDonuts, apiDonutToDonut } from "services/adaptor/api-donuts-to-donuts";
import { apiInvitationsAdaptor } from "services/adaptor/api-invitation-adaptor";
import { apiOperationAdaptor } from "services/adaptor/api-operation-adaptor";
import { apiRequestsAdaptor } from "services/adaptor/api-requests-adaptor";
import { apiSchedulerAdaptor, apiSchedulersAdaptor } from "services/adaptor/api-scheduler-adaptor";
import { apiTenantAdaptor } from "services/adaptor/api-tenant-adaptor";
import { apiTiesAdaptor } from "services/adaptor/api-tie-adaptor";

export const apiAdaptor = (() => {
	return {
		toDonuts: apiDonutsToDonuts,
		toDonut: apiDonutToDonut,
		toRequests: apiRequestsAdaptor,
		toOperations: apiOperationAdaptor,
		toTenant: apiTenantAdaptor,
		toInvitations: apiInvitationsAdaptor,
		toSchedulers: apiSchedulersAdaptor,
		toScheduler: apiSchedulerAdaptor,
		toPies: apiTiesAdaptor,
	};
})();
