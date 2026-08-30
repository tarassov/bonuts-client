import type { GetTenantCurrentApiResponse } from "services/api/bonuts-api";

import type { TTenant } from "@/types/model/tenant";

const dataToTenant = (data: Required<GetTenantCurrentApiResponse>["data"]) => {
	const { attributes, id } = data;

	return {
		...attributes,
		caption: attributes.caption || undefined,
		id: Number(id),
	};
};
export const apiTenantAdaptor = (response?: GetTenantCurrentApiResponse): TTenant | undefined => {
	if (!response) return undefined;

	const { data } = response;

	if (!data) return undefined;

	return dataToTenant(data);
};
