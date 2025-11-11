import { PutDonutsByIdApiResponse } from "services/api/bonuts-api";
import { donutsApi } from "services/api/extended/donuts-api";
import { useUpdateDonutMutation } from "services/api/injected-api";
import { useAppDispatch } from "services/redux/store/store";

import { useProfile } from "@/entities/profile";
import { TDonut } from "@/types/model";

export const useDonut = () => {
	const [updateDonut] = useUpdateDonutMutation();
	const dispatch = useAppDispatch();
	const { profile } = useProfile();
	const putDonut = async (
		donutId: number,
		args: TDonut,
		options?: { onSuccess?: (result: PutDonutsByIdApiResponse) => void }
	) => {
		if (profile?.tenant) {
			const { id, logo, created_at, likes, liked, comments, commentable, likeable, ...props } = args;
			// @ts-ignore
			const logoNew: File | undefined = logo && !Object.getOwnPropertyDescriptor(logo, "url") ? logo : undefined;
			const res = await updateDonut({
				id: donutId.toString(),
				body: { ...props, ...(logoNew && { logo: logoNew }), tenant: profile?.tenant },
			});
			dispatch(donutsApi.util.invalidateTags(["Donuts"]));
			if ("data" in res) {
				options?.onSuccess?.(res.data);
			}
			return res;
		}
		return undefined;
	};

	return { putDonut };
};
