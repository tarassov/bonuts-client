import { usePagintatedListBase } from "logic/hooks/use-pagintated-list-base";
import { apiAdaptor } from "services/adaptor/api-adaptor";
import { accountsApi } from "services/api/extended/accounts-api";

export const useOperationHistory = (args: { id?: number }) => {
	const { id } = args;

	return usePagintatedListBase({
		endpoint: accountsApi.endpoints.getAccountOperations,
		args: {
			accountId: id!.toString(),
			page: 1,
		},
		skip: !id,
		pollingInterval: 10000,
		translator: apiAdaptor.toOperations,
	});
};
