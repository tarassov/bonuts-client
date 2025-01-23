import { useListBase } from "logic/hooks/use-list-base";
import { apiProfilesAdaptor } from "services/adaptor/api-profile-adaptor";
import { reportsApi } from "@/features/reports/services/reports-api";

export const useProfileReports = (
	args: {
		reportType?: "show_balance" | "show_score" | "show_sent";
		searchText?: string;
		dateFrom?: string;
		dateTo?: string;
	} = {},
	skip?: boolean
) => {
	const { reportType, searchText } = args;
	return useListBase({
		endpoint: reportsApi.endpoints.getReportsProfiles,
		translator: apiProfilesAdaptor,
		skip,
		args: { reportType, searchText },
	});
};
