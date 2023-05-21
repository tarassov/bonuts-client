import { TFieldSize, TFieldType, TFormField } from "shared/form/types/bnt-form";
import { UserLogic } from "logic/utils/user-utils";
import { Roles } from "constants/roles";
import { useRoleField } from "hooks/form-field/use-role-field";
import { TProfile } from "@/types/model";

export const useProfileFormFields = (profile?: TProfile | null) => {
	const { roleField } = useRoleField({ disabled: !UserLogic.isAdmin(profile) });
	const fields: Array<TFormField> = [
		{
			disabled: !UserLogic.isAdmin(profile),
			image: false,
			size: TFieldSize.xs,
			name: "email",
			label: "Email",
			xs: 12,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.xs,
			name: "first_name",
			label: "Name",
			xs: 12,
			md: 6,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.md,
			name: "last_name",
			label: "Surname",
			xs: 12,
			md: 6,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.md,
			name: "position",
			label: "Position",
			xs: 12,
		},
		roleField,
		{
			image: false,
			size: TFieldSize.md,
			name: "circles",
			label: "Circles",
			placeholder: "Circles",
			source: [
				{
					key: Roles.admin,
					label: Roles.admin,
				},
				{
					key: Roles.store_admin,
					label: Roles.store_admin,
				},
				{
					key: Roles.moderator,
					label: Roles.moderator,
				},
			],
			type: TFieldType.tags,
			xs: 12,
		},
	];

	return { fields };
};
