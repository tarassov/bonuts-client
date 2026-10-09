import { useCurrentProfile } from "@/shared/model/auth";

import type { PostDonutsApiResponse } from "@/services/api/bonuts-api";
import { useCreateDonutMutation } from "@/services/api/injected-api";

export type TPostDonutArgs = { logo?: File; price: number; name: string };

export const useCreateDonut = () => {
	const [createDonut] = useCreateDonutMutation();
	const { profile } = useCurrentProfile();

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
						options?.onSuccess?.(res);
					}
				});
		}
		return undefined;
	};

	return { postDonut };
};
