import { tiesApi } from "services/api/extended/ties-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { isValid } from "date-fns";
import { formatISO } from "date-fns/fp";
import { useListBase } from "../use-list-base";

export const useTiesList = (dateFrom?: string, dateTo?: string) => {
	const from = dateFrom ? new Date(dateFrom) : undefined;
	const to = dateTo ? new Date(dateTo) : undefined;
	return useListBase({
		endpoint: tiesApi.endpoints.getTies,
		translator: apiAdaptor.toPies,
		args: {
			dateFrom: from && isValid(from) ? formatISO(from) : undefined,
			dateTo: to && isValid(to) ? formatISO(to) : undefined,
		},
	});
};
