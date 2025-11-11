import { PostProfilesByIdSetActivityApiResponse } from "services/api/bonuts-api";
import { texts_a, texts_c, texts_d } from "services/localization/texts";
import { useNotification } from "services/notification";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useModal } from "hooks/use-modal";

import { profilesApi } from "../api/profiles-api";

import { useProfile } from "@/entities/profile";
import { TActionCallback } from "@/types/logic/action-callback";

export const useEmployee = () => {
	const { usePostProfilesByIdSetActivityMutation } = profilesApi;
	const [postEmployeeActivity] = usePostProfilesByIdSetActivityMutation();
	const { authTenant } = useProfile();
	const { showNotification } = useNotification();
	const { ConfirmationModal } = useModal();
	const { t } = useBntTranslate();

	const setActivity = (
		args: { id: number; active: boolean },
		options?: TActionCallback<PostProfilesByIdSetActivityApiResponse>
	) => {
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
					showNotification(texts_d.disabled);
				})
				.catch((e) => options?.onError?.(e.data.message));
		}
	};
	const setActivityWithConfirmation = (
		args: { id: number; active: boolean },
		options?: TActionCallback<PostProfilesByIdSetActivityApiResponse>
	) => {
		ConfirmationModal.show({
			text: t(texts_a.are_you_sure, { capitalize: true }),
			title: t(texts_c.confirmation, { capitalize: true }),
			onSubmit: () => setActivity(args, options),
		});
	};

	return { setActivity, setActivityWithConfirmation };
};
