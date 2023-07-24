import {
	PatchCirclesByIdApiResponse,
	useDeleteCirclesByIdMutation,
	usePatchCirclesByIdMutation,
} from "services/api/bonuts-api";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { TCircle } from "@/types/model";

export const useCircle = () => {
	const [patchCircleApi] = usePatchCirclesByIdMutation();
	const [deleteCircleApi] = useDeleteCirclesByIdMutation();
	const { profile } = useProfileLogic();
	const patchCircle = async (
		circleId: number,
		args: TCircle,
		options?: { onSuccess?: (result: PatchCirclesByIdApiResponse) => void }
	) => {
		const { name } = args;
		if (profile?.tenant && name) {
			const res = await patchCircleApi({
				id: circleId.toString(),
				body: { name, tenant: profile?.tenant },
			});

			if (Object.getOwnPropertyDescriptor(res, "data")) {
				// @ts-ignore
				options?.onSuccess?.(res.data);
			}
			return res;
		}
		return undefined;
	};

	const deleteCircle = async (
		circleId?: number,
		options?: { onSuccess?: (result: PatchCirclesByIdApiResponse) => void }
	) => {
		if (profile?.tenant && circleId) {
			const res = await deleteCircleApi({
				id: circleId.toString(),
				tenant: profile?.tenant,
			});

			if (Object.getOwnPropertyDescriptor(res, "data")) {
				// @ts-ignore
				options?.onSuccess?.(res.data);
			}
			return res;
		}
		return undefined;
	};

	return { patchCircle, deleteCircle };
};
