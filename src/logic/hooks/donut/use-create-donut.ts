import { useCreateDonutMutation } from "services/api/injected-api";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { PostDonutsApiResponse } from "services/api/bonuts-api";
import { TFormValue } from "shared/form/types/bnt-form";
import { donutsApi } from "services/api/extended/donuts-api";
import { useAppDispatch } from "services/redux/store/store";

export const useCreateDonut = () => {
	const [createDonut] = useCreateDonutMutation();
	const dispatch = useAppDispatch();
	const { profile } = useProfileLogic();
	const postDonut = async (
		args: Record<string, TFormValue>,
		options?: { onSuccess?: (result: PostDonutsApiResponse) => void }
	) => {
		const { logo, price, name } = args as { logo?: File; price: number; name: string };
		if (profile?.tenant) {
			const formPayLoad = new FormData();
			if (logo) formPayLoad.append("logo", logo);
			formPayLoad.append("tenant", profile.tenant);
			formPayLoad.append("price", price.toString());
			formPayLoad.append("name", name);
			createDonut(formPayLoad)
				.unwrap()
				.then((res) => {
					if (res.data) {
						dispatch(donutsApi.util.invalidateTags(["Donuts"]));
						options?.onSuccess?.(res);
					}
				});
		}
		return undefined;
	};

	return { postDonut };
};
