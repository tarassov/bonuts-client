import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { usePaginator } from "hooks/use-paginator";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { GetArgsType, GetResultType, TEndpoint } from "@/types/api/api";

export const usePagintatedListBase = <Endpoint extends TEndpoint<Endpoint>, TModel>(props: {
	endpoint: Endpoint;
	args: GetArgsType<Endpoint>;
	pollingInterval: number | undefined;
	translator?: (response: GetResultType<Endpoint>) => Array<TModel>;
}) => {
	const {
		endpoint,
		args,
		pollingInterval = 1000,
		translator = (response: GetResultType<Endpoint>) => response as Array<TModel>,
	} = props;

	const [objects, setObjects] = useState<Array<Array<TModel>>>([]);

	const authTenant = useAppSelector(authTenantSelector);

	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } = usePaginator(
		endpoint,
		{ ...args, tenant: authTenant },
		pollingInterval
	);

	useEffect(() => {
		if (!pages) setObjects(() => []);
		const translated = Object.values(pages).reduce((acc, curr) => {
			acc.push(translator(curr));
			return acc;
		}, [] as Array<Array<TModel>>);
		if (!_.isEqual(objects, translated)) setObjects(translated);
	}, [pages]);

	const flatData = useMemo(
		() => objects.reduce((acc, curr) => [...acc, ...curr], [] as Array<TModel>),
		[objects]
	);

	return {
		hasNext,
		pages: objects,
		isLoading,
		fetchNext,
		hasNew,
		applyUpdates,
		flatData,
	};
};
