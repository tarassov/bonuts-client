import { useEffect, useState } from "react";
import _ from "lodash";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { usePerformance } from "hooks/use-performance";
import { GetArgsType, GetResultType, TEndpoint } from "@/types/api/api";
import { USE_POLLING_INTERVAL } from "@/config";

export const useListBase = <Endpoint extends TEndpoint<Endpoint>, TModel>(props: {
	endpoint: Endpoint;
	args?: GetArgsType<Endpoint>;
	pollingInterval?: number | undefined;
	translator?: (response: GetResultType<Endpoint>) => Array<TModel>;
}) => {
	const { profilerStart, profilerStop } = usePerformance(
		`apiTransaltor for ${props.endpoint.name}`,
		0
	);
	const {
		endpoint,
		args,
		pollingInterval = 1000,
		translator = (response: GetResultType<Endpoint>) => response as Array<TModel>,
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
			pollingInterval: !USE_POLLING_INTERVAL
				? 0
				: pollingInterval !== undefined
				? pollingInterval
				: 5000,
			refetchOnMountOrArgChange: true,
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
