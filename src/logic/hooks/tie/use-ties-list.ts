import { tiesApi } from "services/api/extended/ties-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { isValid } from "date-fns/fp";
import { useListBase } from "../use-list-base";

export const useTiesList = (dateFrom?: string, dateTo?: string) => {
	return useListBase({
		endpoint: tiesApi.endpoints.getTies,
		translator: apiAdaptor.toPies,
		args: {
			dateFrom: isValid(dateFrom) ? dateFrom : undefined,
			dateTo: isValid(dateTo) ? dateTo : undefined,
		},
	});
};
