import { usePutEventsByIdMutation } from "../../services/api/bonuts-api";
import { TEvent } from "../../types/model";
import { TLikeable } from "../../types/model/type-extension";
import { useAppSelector } from "../../services/store/store";
import { authTenantSelector } from "../../services/redux/auth-slice";
type TEventUpdate = {
	content: string;
};
export const useEventLogic = () => {
	const [putEvent] = usePutEventsByIdMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const toggleLike = (event: TEvent & TLikeable) => {
		authTenant &&
			putEvent({
				id: event.id.toString(),
				body: { like: true, tenant: authTenant }, //like true toggles like (backend logic)
			});
	};

	const updateEvent = (event: TEvent & TLikeable, values: TEventUpdate) => {
		authTenant &&
			putEvent({
				id: event.id.toString(),
				body: { ...values, like: false, tenant: authTenant }, //like true toggles like (backend logic)
			});
	};
	return { toggleLike, updateEvent };
};
