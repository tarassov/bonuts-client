import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { PostDonutsApiResponse } from "services/api/bonuts-api";
import { TFormValue } from "shared/form/types/bnt-form";
import { extendedApi } from "services/api/extended-api";
import { useAppDispatch } from "services/redux/store/store";
import { usePutDonutsByIdMutation } from "services/api/form-data-api";

export const useUpdateDonut = () => {
	const [updateDonut] = usePutDonutsByIdMutation();
	const dispatch = useAppDispatch();
	const { profile } = useProfileLogic();
	const putDonut = async (
		id: number,
		args: Record<string, TFormValue>,
		options?: { onSuccess?: (result: PostDonutsApiResponse) => void }
	) => {
		const { logo, price, name } = args as { logo?: File; price: number; name: string };
		if (profile?.tenant) {
			const formPayLoad = new FormData();
			if (logo && !Object.getOwnPropertyDescriptor(logo, "url")) formPayLoad.append("logo", logo);
			formPayLoad.append("tenant", profile.tenant);
			formPayLoad.append("price", price.toString());
			formPayLoad.append("name", name);
			updateDonut({ id, body: formPayLoad })
				.unwrap()
				.then((res) => {
					if (res.data) {
						dispatch(extendedApi.util.invalidateTags(["Donuts"]));
						options?.onSuccess?.(res);
					}
				});
		}
		return undefined;
	};

	return { putDonut };
};
