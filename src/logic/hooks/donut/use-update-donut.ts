import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { PutDonutsByIdApiResponse } from "services/api/bonuts-api";
import { donutsApi } from "services/api/extended/donuts-api";
import { useAppDispatch } from "services/redux/store/store";
import { useUpdateDonutMutation } from "services/api/form-data-api";
import { TDonut } from "@/types/model";

export const useUpdateDonut = () => {
	const [updateDonut] = useUpdateDonutMutation();
	const dispatch = useAppDispatch();
	const { profile } = useProfileLogic();
	const putDonut = async (
		donutId: number,
		args: TDonut,
		options?: { onSuccess?: (result: PutDonutsByIdApiResponse) => void }
	) => {
		if (profile?.tenant) {
			const { id, logo, created_at, likes, liked, comments, commentable, likeable, ...props } =
				args;
			// @ts-ignore
			const logoNew: File | undefined =
				logo && !Object.getOwnPropertyDescriptor(logo, "url") ? logo : undefined;
			const res = await updateDonut({
				id: donutId.toString(),
				body: { ...props, ...(logoNew && { logo: logoNew }), tenant: profile?.tenant },
			});
			dispatch(donutsApi.util.invalidateTags(["Donuts"]));
			if (Object.getOwnPropertyDescriptor(res, "data")) {
				// @ts-ignore
				options?.onSuccess?.(res.data);
			}
			return res;
		}
		return undefined;
	};

	return { putDonut };
};
