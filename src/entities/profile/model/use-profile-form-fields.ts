import { useMemo } from "react";

import { useRoleField } from "hooks/form-field/use-role-field";

import { UserLogic } from "@/shared/lib";
import { useCurrentProfile } from "@/shared/model/auth";
import type { TFormField, TFormFieldSourceItem } from "@/shared/ui/form";
import { FieldSize, FieldType } from "@/shared/ui/form";

import { useCircleLoaderList } from "logic/hooks/cirlce/use-circle-loader-list";
import { texts_c, texts_d, texts_e, texts_f, texts_l, texts_p, texts_s } from "@/services/localization/texts";
import { type TCircle, type TProfile } from "@/types/model";

interface IProps {
	isEmailEditable?: boolean;
}

export const useProfileFormFields = ({ isEmailEditable = true }: IProps = {}) => {
	const { profile } = useCurrentProfile();
	const { roleField } = useRoleField<TProfile>({ disabled: !UserLogic.isAdmin(profile) });
	const { objects: circles, isLoading } = useCircleLoaderList();
	const fields = useMemo<Array<TFormField<TProfile>>>(() => {
		return [
			{
				readOnly: !UserLogic.isAdmin(profile),
				image: false,
				size: FieldSize.xs,
				name: "email",
				label: texts_e.email,
				xs: 12,
				required: true,
				disabled: !isEmailEditable,
			},
			{
				disabled: false,
				image: false,
				size: FieldSize.xs,
				name: "first_name",
				label: texts_f.first_name,
				xs: 12,
				md: 6,
			},
			{
				disabled: false,
				image: false,
				size: FieldSize.md,
				name: "last_name",
				label: texts_l.last_name,
				xs: 12,
				md: 6,
			},
			{
				image: false,
				size: FieldSize.xs,
				name: "contact",
				label: texts_c.contact,
				xs: 12,
				required: true,
			},
			{
				disabled: false,
				image: false,
				size: FieldSize.md,
				name: "position",
				label: texts_p.position,
				xs: 12,
			},
			roleField,
			{
				image: false,
				size: FieldSize.xs,
				name: "birthdate",
				label: texts_d.date_of_birth,
				type: FieldType.date,
				md: 6,
				sm: 12,
				xs: 12,
			},
			{
				image: false,
				size: FieldSize.xs,
				name: "in_date",
				label: texts_e.employment_date,
				type: FieldType.date,
				md: 6,
				sm: 12,
				xs: 12,
			},
			{
				image: false,
				size: FieldSize.md,
				name: "circles",
				label: texts_c.circles,
				placeholder: texts_c.circles,
				source: circles.map((circle: TCircle): TFormFieldSourceItem => {
					return { key: circle.id, label: circle.name };
				}),
				valueToOption: (values: Array<TCircle>) => {
					return values.map((x) => {
						return { key: x.id, label: x.name };
					});
				},
				optionToValue: (option) => option.key,
				type: FieldType.tags,
				loading: isLoading,
				xs: 12,
			},
			{
				image: false,
				size: FieldSize.md,
				name: "bio",
				placeholder: texts_s.some_interesting_facts,
				type: FieldType.textarea,
				maxRows: 7,
				minRows: 5,
				rows: 6,
				xs: 12,
			},
		];
	}, [circles, isLoading, profile, roleField, isEmailEditable]);

	return { fields };
};
