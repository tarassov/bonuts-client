import { FieldSize, FieldType, type TFormField, type TFormProps, type TFormValue } from "shared/ui/form/types/bnt-form";

import { BntForm } from "shared/ui/form/bnt-form";

import { CommonStrings } from "constants/dictionary";

import { useModal } from "hooks/use-modal";

import { useUpdateAvatar } from "@/entities/profile/model/use-update-avatar";
import { TProfile } from "@/types/model";

export function BntProfileImage({ profile }: { profile?: TProfile }) {
	const { postAvatar } = useUpdateAvatar();
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
			size: FieldSize.xs,
			name: "user_avatar",
			label: "Avatar",
			type: FieldType.imageUpload,
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
			const file = values.user_avatar as File;
			return postAvatar({ file, id: profile.id });
		}
		return undefined;
	};
	return <BntForm hasInitial initialValues={initialValues} {...formProps} onSubmit={onSubmit} />;
}
