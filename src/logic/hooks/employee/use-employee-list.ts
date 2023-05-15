import { extendedApi } from "services/api/extended-api";
import { apiProfilesToProfiles } from "services/adaptor/api-profile-to-profile";
import { useListBase } from "../use-list-base";

export const useEmployeeList = () => {
	return useListBase({
		endpoint: extendedApi.endpoints.getProfiles,
		translator: apiProfilesToProfiles,
	});
};
