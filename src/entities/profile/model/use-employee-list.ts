import { apiProfilesAdaptor } from "services/adaptor/api-profile-adaptor";

import { useListBase } from "logic/hooks/use-list-base";

import { profilesApi } from "../api/profiles-api";

export const useEmployeeList = (args: { searchText?: string } = {}) => {
	const { searchText } = args;
	return useListBase({
		endpoint: profilesApi.endpoints.getProfiles,
		translator: apiProfilesAdaptor,
		args: { searchText },
	});
};
