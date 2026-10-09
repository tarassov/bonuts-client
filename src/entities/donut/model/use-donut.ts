import { isBlank, present } from "@/shared/lib/type-guards";

import { useProfile } from "@/entities/profile";

import type { PutDonutsByIdApiResponse } from "@/services/api/bonuts-api";
import { useUpdateDonutMutation } from "@/services/api/injected-api";
import type { TDonut } from "@/types/model";

type TDonutUpdate = Omit<TDonut, "logo"> & { logo?: TDonut["logo"] | File };

export const useDonut = () => {
	const [updateDonut, { isLoading: isUpdating }] = useUpdateDonutMutation();
	const { profile } = useProfile();
	const putDonut = async (donutId: number, args: TDonutUpdate, options?: { onSuccess?: (result: PutDonutsByIdApiResponse) => void }) => {
		if (profile?.tenant) {
			const { id, logo, created_at, likes, liked, comments, commentable, likeable, ...props } = args;

			const logoNew = logo && (logo instanceof File || isBlank(logo.url)) ? logo : undefined;
			const res = await updateDonut({
				id: donutId.toString(),
				body: { ...props, ...(logoNew && { logo: logoNew }), tenant: profile?.tenant },
			});

			if (present(res.data)) {
				options?.onSuccess?.(res.data);
			}
			return res;
		}
		return undefined;
	};

	return { putDonut, isUpdating };
};
