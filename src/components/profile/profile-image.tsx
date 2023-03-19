import { useProfileLogic } from "../../logic/hooks/use-profile-logic";
import {
	TFieldSize,
	TFieldType,
	TFormField,
	TFormImageValue,
	TFormProps,
	TFormValue,
} from "../../base/form/types/bnt-form";
import { BntForm } from "../../base/form/bnt-form";
import { useBntTranslate } from "../../hooks/use-bnt-translate";
import { useUpdateAvatarsMutation } from "../../services/api/form-data-api";

export const BntProfileImage = () => {
	const { profile, updateProfile } = useProfileLogic();
	const [updateAvatars] = useUpdateAvatarsMutation();
	const { translate } = useBntTranslate();
	const fields: Array<TFormField> = [
		{
			image: true,
			size: TFieldSize.xs,
			name: "user_avatar",
			label: "Avatar",
			type: TFieldType.imageUpload,
			xs: 12,
		},
	];
	const formProps: TFormProps = { fields, formId: "user-profile" };
	const initialValues = profile;
	const onSubmit = (
		values: Record<string, TFormValue>
	): Promise<{ data: any } | { error: any } | undefined> | undefined => {
		if (profile && profile.tenant && profile.id) {
			const formPayLoad = new FormData();
			const file = values["user_avatar"] as File;
			formPayLoad.append("uploaded_image", file);
			formPayLoad.append("tenant", profile.tenant);
			formPayLoad.append("id", profile.id.toString());
			return updateAvatars(formPayLoad);
		}
	};
	return (
		<>
			<BntForm
				hasInitial={true}
				initialValues={initialValues}
				{...formProps}
				onSubmit={onSubmit}
			/>
		</>
	);
};
