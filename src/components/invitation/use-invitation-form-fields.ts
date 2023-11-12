import { TFieldSize, TFormField } from "shared/form/types/bnt-form";
import { TUser } from "@/types/model";

export const useInvitationFormFields = () => {
	const fields: Array<TFormField<TUser>> = [
		{
			image: false,
			size: TFieldSize.xs,
			name: "email",
			label: "Email",
			xs: 12,
			required: true,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.xs,
			name: "first_name",
			label: "Name",
			xs: 12,
			md: 6,
			required: true,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.md,
			name: "last_name",
			label: "Surname",
			xs: 12,
			md: 6,
			required: true,
		},
	];

	return { fields };
};
