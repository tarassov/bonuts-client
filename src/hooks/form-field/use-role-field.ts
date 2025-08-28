import { FieldSize, FieldType, TFormField } from "shared/ui/form/types/bnt-form";

import { Roles } from "constants/roles";

export const useRoleField = <T extends { roles?: Array<string> }>({ disabled }: { disabled?: boolean }) => {
	const roleField: TFormField<T> = {
		disabled,
		image: false,
		size: FieldSize.md,
		name: "roles",
		label: "Roles",
		placeholder: "Roles",
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
		type: FieldType.tags,
		optionToValue: (option) => (option.key ? option.key : option),
		xs: 12,
	};

	return { roleField };
};
