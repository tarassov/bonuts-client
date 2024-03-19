import { apiDonutsToDonuts, apiDonutToDonut } from "services/adaptor/api-donuts-to-donuts";
import { apiRequestsAdaptor } from "services/adaptor/api-requests-adaptor";
import { apiOperationAdaptor } from "services/adaptor/api-operation-adaptor";
import { apiTenantAdaptor, apiTenantsAdaptor } from "services/adaptor/api-tenant-adaptor";
import { apiInvitationsAdaptor } from "services/adaptor/api-invitation-adaptor";
import { apiSchedulerAdaptor, apiSchedulersAdaptor } from "services/adaptor/api-scheduler-adaptor";
import { apiTiesAdaptor } from "services/adaptor/api-tie-adaptor";
import { apiEventsToPosts, apiEventToPost } from "./api-events-to-posts";

export const apiAdaptor = (() => {
	return {
		toPosts: apiEventsToPosts,
		toPost: apiEventToPost,
		toDonuts: apiDonutsToDonuts,
		toDonut: apiDonutToDonut,
		toRequests: apiRequestsAdaptor,
		toOperations: apiOperationAdaptor,
		toTenant: apiTenantAdaptor,
		toTenants: apiTenantsAdaptor,
		toInvitations: apiInvitationsAdaptor,
		toSchedulers: apiSchedulersAdaptor,
		toScheduler: apiSchedulerAdaptor,
		toPies: apiTiesAdaptor,
	};
})();
