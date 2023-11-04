import { useGetEventsByIdQuery } from "services/api/extended/events-api";
import { apiAdaptor } from "services/adaptor/api-adaptor";

export const useEventLoader = (id?: number | string | null) => {
	const { data, error, isLoading } = useGetEventsByIdQuery(
		{
			id: id?.toString() || "",
		},
		{ skip: !id }
	);

	const post = data ? apiAdaptor.toPost(data) : undefined;
	return { post, isLoading, error };
};
