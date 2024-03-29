import { apiProfilesAdaptor } from "services/adaptor/api-profile-adaptor";
import { profilesApi } from "services/api/extended/profiles-api";
import { useListBase } from "../use-list-base";

export const useEmployeeList = (args: { searchText?: string } = {}) => {
	const { searchText } = args;
	return useListBase({
		endpoint: profilesApi.endpoints.getProfiles,
		translator: apiProfilesAdaptor,
		args: { searchText },
	});
};
