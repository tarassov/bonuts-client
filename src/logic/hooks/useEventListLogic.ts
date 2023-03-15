import { usePaginator } from "../../hooks/use-paginator";
import { extendedApi } from "../../services/api/extended-api";
import { useEffect, useState } from "react";
import { apiTranslator } from "../../services/translator";
import { TPost } from "../../types/model/post";
import { useAppSelector } from "../../services/store/store";
import { authTenantSelector } from "../../services/redux/auth-slice";

export const useEventListLogic = () => {
	const [events, setEvents] = useState<Array<Array<TPost>>>([]);
	const authTenant = useAppSelector(authTenantSelector);
	const { hasNext, pages, isLoading, fetchNext, hasNew, applyUpdates } =
		usePaginator(
			extendedApi.endpoints.getEvents,
			{
				tenant: authTenant || undefined,
				showMine: "false",
				page: 1,
			},
			10000
		);
	useEffect(() => {
		if (!pages) setEvents(() => []);
		const translated = Object.values(pages).reduce((acc, curr) => {
			acc.push(apiTranslator.toPosts(curr));
			return acc;
		}, [] as Array<Array<TPost>>);
		setEvents(translated);
	}, [pages]);

	return { hasNext, pages: events, isLoading, fetchNext, hasNew, applyUpdates };
};
