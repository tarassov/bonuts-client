import { useBntTranslate } from "hooks/use-bnt-translate";
import { PostProfilesByIdSetActivityApiResponse } from "services/api/bonuts-api";
import { texts_a, texts_d } from "services/localization/texts";

import { useModal } from "@/shared/lib/modal";
import { useNotification } from "@/shared/ui/notification";

import { useProfile } from "@/entities/profile";

import { profilesApi } from "../api/profiles-api";

import { TActionCallback } from "@/types/logic/action-callback";

export const useEmployee = () => {
	const { usePostProfilesByIdSetActivityMutation } = profilesApi;
	const [postEmployeeActivity] = usePostProfilesByIdSetActivityMutation();
	const { authTenant } = useProfile();
	const { showNotification } = useNotification();
	const { EmployeeDeactivation } = useModal();
	const { t } = useBntTranslate();

	const setActivity = (args: { id: number; active: boolean }, options?: TActionCallback<PostProfilesByIdSetActivityApiResponse>) => {
		const { id, active } = args;
		if (authTenant) {
			postEmployeeActivity({
				id,
				body: {
					tenant: authTenant,
					active,
				},
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(active ? texts_a.activated : texts_d.disabled);
				})
				.catch((e) => options?.onError?.(e.data.message));
		}
	};
	const deactivateWithConfirmation = (id: number, name?: string) => {
		EmployeeDeactivation.show({
			name,
			title: t(texts_d.disable_account, { capitalize: true }),
			onSubmit: () => setActivity({ id, active: false }),
		});
	};

	return { setActivity, deactivateWithConfirmation };
};
