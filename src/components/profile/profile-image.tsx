import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import {
	TFieldSize,
	TFieldType,
	TFormField,
	TFormProps,
	TFormValue,
} from "shared/form/types/bnt-form";
import { BntForm } from "shared/form/bnt-form";
import { useUpdateAvatarsMutation } from "services/api/form-data-api";
import { useModal } from "hooks/use-modal";
import { CommonStrings } from "constants/dictionary";

export const BntProfileImage = () => {
	const { profile } = useProfileLogic();
	const [updateAvatars] = useUpdateAvatarsMutation();
	const { ImageModal } = useModal();

	const onClick = (url?: string) => {
		ImageModal.show({
			url: url || CommonStrings.EMPTY_STRING,
			title: profile?.name,
		});
	};
	const fields: Array<TFormField> = [
		{
			image: true,
			size: TFieldSize.xs,
			name: "user_avatar",
			label: "Avatar",
			type: TFieldType.imageUpload,
			xs: 12,
			onClick: (value) => onClick(value?.toString()),
		},
	];
	const formProps: TFormProps<any> = { fields, formId: "user-profile" };
	const initialValues = profile;
	const onSubmit = (
		values: Record<string, TFormValue>
	): Promise<{ data: any } | { error: any } | undefined> | undefined => {
		if (profile && profile.tenant && profile.id) {
			const formPayLoad = new FormData();
			const file = values.user_avatar as File;
			formPayLoad.append("uploaded_image", file);
			formPayLoad.append("tenant", profile.tenant);
			formPayLoad.append("id", profile.id.toString());
			return updateAvatars(formPayLoad);
		}
		return undefined;
	};
	return <BntForm hasInitial initialValues={initialValues} {...formProps} onSubmit={onSubmit} />;
};
