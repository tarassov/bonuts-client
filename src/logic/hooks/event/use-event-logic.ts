import { usePutEventsByIdMutation } from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { TEvent } from "@/types/model";
import { TLikeable } from "@/types/model/type-extension";

type TEventUpdate = {
	content: string;
};
export const useEventLogic = () => {
	const [putEvent] = usePutEventsByIdMutation();
	const authTenant = useAppSelector(authTenantSelector);
	const toggleLike = (event: TEvent & TLikeable) => {
		if (authTenant) {
			putEvent({
				id: event.id.toString(),
				body: { like: true, tenant: authTenant }, // like true toggles like (backend hooks)
			});
		}
	};

	const updateEvent = (event: TEvent & TLikeable, values: TEventUpdate) => {
		if (authTenant) {
			putEvent({
				id: event.id.toString(),
				body: { ...values, like: false, tenant: authTenant }, // like true toggles like (backend hooks)
			});
		}
	};

	return { toggleLike, updateEvent };
};
