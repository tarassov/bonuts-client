import {
	TFieldSize,
	TFieldType,
	TFormField,
	TFormProps,
	TFormValue,
} from "shared/ui/form/types/bnt-form";
import { BntForm } from "shared/ui/form/bnt-form";
import { useModal } from "hooks/use-modal";
import { CommonStrings } from "constants/dictionary";
import { useUpdateAvatar } from "logic/hooks/profile/use-update-avatar";
import { FC } from "react";
import { TProfile } from "@/types/model";

export const BntProfileImage: FC<{ profile?: TProfile }> = ({ profile }) => {
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
			const file = values.user_avatar as File;
			return postAvatar({ file, id: profile.id });
		}
		return undefined;
	};
	return <BntForm hasInitial initialValues={initialValues} {...formProps} onSubmit={onSubmit} />;
};
