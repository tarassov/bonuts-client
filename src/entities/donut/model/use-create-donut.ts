import { PostDonutsApiResponse } from "services/api/bonuts-api";
import { donutsApi } from "services/api/extended/donuts-api";
import { useCreateDonutMutation } from "services/api/injected-api";
import { useAppDispatch } from "services/redux/store/store";

import { useCurrentAuth } from "shared/model/auth";

export type TPostDonutArgs = { logo?: File; price: number; name: string };

export const useCreateDonut = () => {
	const [createDonut] = useCreateDonutMutation();
	const dispatch = useAppDispatch();
	const { profile } = useCurrentAuth();

	const postDonut = async (args: TPostDonutArgs, options?: { onSuccess?: (result: PostDonutsApiResponse) => void }) => {
		const { logo, price, name } = args;

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
