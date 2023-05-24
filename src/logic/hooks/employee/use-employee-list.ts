import { extendedApi } from "services/api/extended-api";
import { apiProfilesAdaptor } from "services/adaptor/api-profile-adaptor";
import { useListBase } from "../use-list-base";

export const useEmployeeList = () => {
	return useListBase({
		endpoint: extendedApi.endpoints.getProfiles,
		translator: apiProfilesAdaptor,
	});
};
