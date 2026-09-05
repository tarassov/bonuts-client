import { useMemo } from "react";

import { Roles } from "constants/roles";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_m, texts_r, texts_s } from "services/localization/texts";

import type { TFormField, TFormFieldSource } from "@/shared/ui/form";
import { FieldSize, FieldType } from "@/shared/ui/form";

export const useRoleField = <T extends { roles?: Array<string> }>({ disabled }: { disabled?: boolean }) => {
	const { translate } = useBntTranslate();
	const roleField = useMemo<TFormField<T>>(() => {
		const source: TFormFieldSource = [
			{
				key: Roles.admin,
				label: translate(texts_a.admin),
			},
			{
				key: Roles.store_admin,
				label: translate(texts_s.store_admin),
			},
			{
				key: Roles.moderator,
				label: translate(texts_m.moderator),
			},
		];

		return {
			disabled,
			image: false,
			size: FieldSize.md,
			name: "roles",
			label: texts_r.roles,
			placeholder: texts_r.roles,
			source,
			type: FieldType.tags,
			valueToOption: (roles: Array<string>) => {
				return roles.map((role) => source.find((option) => option.key === role) ?? { key: role, label: role });
			},
			optionToValue: (option) => (option.key ? option.key : option),
			xs: 12,
		};
	}, [disabled, translate]);

	return { roleField };
};
