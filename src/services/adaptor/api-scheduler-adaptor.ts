import {
	GetDonutsSchedulersApiResponse,
	GetDonutsSchedulersByIdApiResponse,
} from "services/api/bonuts-api";

import { dataToProfile } from "services/adaptor/api-profile-adaptor";
import { TScheduler, TSchedulerType } from "@/types/model/scheduler";

const extract = (args: GetDonutsSchedulersByIdApiResponse["data"]) => {
	const { attributes, id } = args || {};
	return {
		...attributes,
		id: Number(id),
		name: attributes?.name || undefined,
		comment: attributes?.comment || undefined,
		day: attributes?.day || undefined,
		weekday: attributes?.weekday || undefined,
		every: (attributes?.every as TSchedulerType) || undefined,
		execute_time: attributes?.execute_time || undefined,
		timezone: attributes?.timezone || undefined,
		time_in_seconds: attributes?.time_in_seconds || undefined,
		burn_old: attributes?.burn_old || false,
		profile: attributes?.profile
			? dataToProfile({
					attributes: {
						...attributes?.profile,
					},
					id: attributes?.profile?.id.toString(),
			  })
			: undefined,
	};
};
export const apiSchedulersAdaptor = (
	response: GetDonutsSchedulersApiResponse
): Array<TScheduler> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		return extract(target);
	});
};
export const apiSchedulerAdaptor = (
	response?: GetDonutsSchedulersByIdApiResponse
): TScheduler | undefined => {
	if (!response) return undefined;
	const { data } = response;

	if (!data) return undefined;

	return extract(data);
};
