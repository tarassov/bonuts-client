import {
	GetDonutsSchedulersApiResponse,
	GetDonutsSchedulersByIdApiResponse,
} from "services/api/bonuts-api";

import { TScheduler, TSchedulerType } from "@/types/model/scheduler";

export const apiSchedulersAdaptor = (
	response: GetDonutsSchedulersApiResponse
): Array<TScheduler> => {
	const { data } = response;

	if (!data) return [];

	return data.map((target) => {
		const { attributes, id } = target;
		return {
			...attributes,
			id: Number(id),
			name: attributes.name || undefined,
			comment: attributes.name || undefined,
			day: attributes.day || undefined,
			weekday: attributes.weekday || undefined,
			every: (attributes.every as TSchedulerType) || undefined,
			execute_time: attributes.execute_time || undefined,
			timezone: attributes.timezone || undefined,
		};
	});
};
export const apiSchedulerAdaptor = (
	response?: GetDonutsSchedulersByIdApiResponse
): TScheduler | undefined => {
	if (!response) return undefined;
	const { data } = response;

	if (!data) return undefined;

	const { attributes, id } = data;
	return {
		...attributes,
		id: Number(id),
		name: attributes.name || undefined,
		comment: attributes.name || undefined,
		day: attributes.day || undefined,
		weekday: attributes.weekday || undefined,
		every: (attributes.every as TSchedulerType) || undefined,
		execute_time: attributes.execute_time || undefined,
		timezone: attributes.timezone || undefined,
	};
};
