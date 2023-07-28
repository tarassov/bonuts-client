import { GetAccountsByIdApiResponse } from "services/api/bonuts-api";
import { TAccount } from "@/types/model/account";

export const apiAccountAdaptor = (response?: GetAccountsByIdApiResponse): TAccount | undefined => {
	if (!response) return undefined;
	const { data } = response;

	if (!data) return undefined;

	const { attributes, id } = data;
	return {
		...attributes,
		id: Number(id),
	};
};
