import { useEffect, useState } from "react";
import _ from "lodash";

import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useAppSelector } from "services/redux/store/store";

import { usePerformance } from "hooks/use-performance";

import { USE_POLLING_INTERVAL } from "@/app/config";

import { GetArgsType, GetResultType, TEndpoint } from "@/types/api/api";

export const useListBase = <Endpoint extends TEndpoint<Endpoint>, TModel>(props: {
	endpoint: Endpoint;
	args?: GetArgsType<Endpoint>;
	pollingInterval?: number | undefined;
	skip?: boolean;
	translator?: (response: GetResultType<Endpoint>) => Array<TModel>;
}) => {
	const { profilerStart, profilerStop } = usePerformance(`apiTranslator for ${props.endpoint.name}`, 0);
	const {
		endpoint,
		args,
		pollingInterval = 1000,
		translator = (response: GetResultType<Endpoint>) => response as Array<TModel>,
		skip,
	} = props;

	const [objects, setObjects] = useState<Array<TModel>>([]);

	const authTenant = useAppSelector(authTenantSelector);

	const { data, isLoading, isSuccess, refetch } = endpoint.useQuery(
		{
			...args,
			tenant: authTenant,
		},
		{
			// eslint-disable-next-line no-nested-ternary
			pollingInterval: !USE_POLLING_INTERVAL ? 0 : pollingInterval !== undefined ? pollingInterval : 5000,
			refetchOnMountOrArgChange: true,
			skip,
		}
	);

	useEffect(() => {
		if (!data) {
			setObjects(() => []);
		} else {
			profilerStart();
			const translated = translator(data);
			if (!_.isEqual(objects, translated)) setObjects(translated);
			profilerStop();
		}
	}, [data]);

	return {
		objects,
		isLoading,
		isSuccess,
		refetch,
	};
};
