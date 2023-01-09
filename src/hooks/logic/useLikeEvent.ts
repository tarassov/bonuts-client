import { usePutEventsByIdMutation } from "../../services/api/bonuts-api";
import { TEvent } from "../../types/model";
import { TLikeable } from "../../types/model/type-extension";
import { useAppSelector } from "../../services/store/store";

export const useLikeEvent = () => {
	const [putEvent] = usePutEventsByIdMutation();
	const auth = useAppSelector((store) => store.auth);
	const toggleLike = (event: TEvent & TLikeable) => {
		auth?.tenant &&
			putEvent({
				id: event.id.toString(),
				body: { like: true, tenant: auth.tenant }, //like true toggles like (backend logic)
			});
	};
	return toggleLike;
};
