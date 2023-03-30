import {
	useGetDonutsByIdQuery,
	usePostAccountOperationsMutation,
	usePutEventsByIdMutation,
} from "../../services/api/bonuts-api";
import { TEvent } from "../../types/model";
import { TLikeable } from "../../types/model/type-extension";
import { useAppSelector } from "../../services/store/store";
import { authTenantSelector } from "../../services/redux/auth-slice";
import { TDonut } from "../../types/model/donut";
import { apiDonutToDonut } from "../../services/adaptor/api-donuts-to-donuts";
type TEventUpdate = {
	content: string;
};
export const useDonutLogic = (id?: string | null) => {
	const authTenant = useAppSelector(authTenantSelector);
	const [buyEvent] = usePostAccountOperationsMutation();
	const { data, error, isLoading } = useGetDonutsByIdQuery({
		id: id || "",
		tenant: authTenant || undefined,
	});

	const buy = (event: TEvent & TLikeable) => {
		// authTenant &&
		// 	buyEvent({
		// 		id: id,
		// 		// body: { tenant: authTenant }, //like true toggles like (backend hooks)
		// 	});
	};

	const donut = apiDonutToDonut(data);
	return { donut, isLoading, error };
};
