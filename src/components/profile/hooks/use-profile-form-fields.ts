import {
	TFieldSize,
	TFieldType,
	TFormField,
	TFormFieldSourceItem,
} from "shared/form/types/bnt-form";
import { UserLogic } from "logic/utils/user-utils";
import { useRoleField } from "hooks/form-field/use-role-field";
import { useCircleList } from "logic/hooks/cirlce/use-circle-list";
import { texts_a } from "services/localization/texts/texts_a";
import { texts_e } from "services/localization/texts/texts_e";
import { TProfile } from "@/types/model";
import { TCircle } from "@/types/model/circle";

export const useProfileFormFields = (profile?: TProfile | null) => {
	const { roleField } = useRoleField({ disabled: !UserLogic.isAdmin(profile) });
	const { objects: circles, isLoading } = useCircleList();
	const circleToOption = (circle: TCircle): TFormFieldSourceItem => {
		return { key: circle.id, label: circle.name };
	};
	const fields: Array<TFormField> = [
		{
			disabled: !UserLogic.isAdmin(profile),
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
			image: false,
			size: TFieldSize.xs,
			name: "contact",
			label: "Contact",
			xs: 12,
			required: true,
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
			size: TFieldSize.xs,
			name: "birthdate",
			label: "Date of birth",
			type: TFieldType.date,
			md: 6,
			sm: 12,
			xs: 12,
		},
		{
			image: false,
			size: TFieldSize.xs,
			name: "in_date",
			label: texts_e.employment_date,
			type: TFieldType.date,
			md: 6,
			sm: 12,
			xs: 12,
		},
		{
			image: false,
			size: TFieldSize.md,
			name: "circles",
			label: "Circles",
			placeholder: "Circles",
			source: circles.map(circleToOption),
			convertSourceValue: (values: Array<TCircle>) => values.map((x) => x.id),
			valueToOption: circleToOption,
			type: TFieldType.tags,
			loading: isLoading,
			xs: 12,
		},
		{
			image: false,
			size: TFieldSize.md,
			name: "bio",
			label: texts_a.about_myself,
			placeholder: texts_a.about_myself,
			type: TFieldType.textarea,
			maxRows: 7,
			minRows: 5,
			rows: 6,
			xs: 12,
		},
	];

	return { fields };
};
