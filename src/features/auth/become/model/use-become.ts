import { persistAuthSession, useAuthTenant } from "@/shared/model/auth";
import { useNotification } from "@/shared/ui/notification";

import { useGetProfileQuery, usePostBecomeMutation } from "@/services/api/bonuts-api";

export function useBecome(userId?: number) {
	const tenant = useAuthTenant();
	const { data } = useGetProfileQuery({ tenant: tenant || undefined }, { skip: !tenant });
	const [postBecome, { isLoading }] = usePostBecomeMutation();
	const { showResponseError } = useNotification();
	const canBecome = data?.data?.attributes?.system_admin === true && !!userId && userId !== data?.data?.attributes?.user_id;

	const become = async () => {
		if (!canBecome || !userId || isLoading) return;

		try {
			const payload = await postBecome({ body: { user_id: userId } }).unwrap();
			persistAuthSession(payload);
			// Reload clears all in-memory data and permissions from the administrator session.
			window.location.assign("/");
		} catch (error) {
			showResponseError(error);
		}
	};

	return { canBecome, isLoading, become };
}
