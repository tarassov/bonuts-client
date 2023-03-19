import { usePaginator } from "../../hooks/use-paginator";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../services/store/store";
import { authTenantSelector } from "../../services/redux/auth-slice";
import { GetArgsType, GetResultType, TEndpoint } from "../../types/api/api";
import _ from "lodash";

export const usePagintatedListBase = <
	Endpoint extends TEndpoint<Endpoint>,
	TModel
>(props: {
	endpoint: Endpoint;
	args: GetArgsType<Endpoint>;
	pollingInterval: number | undefined;
	translator?: (response: GetResultType<Endpoint>) => Array<TModel>;
}) => {
	const {
		endpoint,
		args,
		pollingInterval = 1000,
		translator = (response: GetResultType<Endpoint>) =>
			response as Array<TModel>,
	} = props;

	const [objects, setObjects] = useState<Array<Array<TModel>>>([]);

	const authTenant = useAppSelector(authTenantSelector);

	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } =
		usePaginator(endpoint, { ...args, tenant: authTenant }, pollingInterval);

	useEffect(() => {
		if (!pages) setObjects(() => []);
		const translated = Object.values(pages).reduce((acc, curr) => {
			acc.push(translator(curr));
			return acc;
		}, [] as Array<Array<TModel>>);
		if (!_.isEqual(objects, translated)) setObjects(translated);
	}, [pages]);

	return {
		hasNext,
		pages: objects,
		isLoading,
		fetchNext,
		hasNew,
		applyUpdates,
	};
};
