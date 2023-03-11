import { useProfileLogic } from "../../hooks/logic/useProfileLogic";
import { TFieldSize, TFormField, TFormProps } from "../../base/types/bnt-form";
import { BntForm } from "../../base/form/bnt-form";

export const BntProfileForm = () => {
	const { profile, updateProfile } = useProfileLogic();
	const fields: Array<TFormField> = [
		{
			disabled: false,
			image: false,
			size: TFieldSize.xs,
			name: "first_name",
			label: "Name",
			xs: 6,
			md: 8,
		},
		{
			disabled: false,
			image: false,
			size: TFieldSize.md,
			name: "last_name",
			label: "Surname",
			xs: 6,
			md: 8,
		},
	];
	const formProps: TFormProps = { fields, formId: "user-profile" };
	const initialValues = profile;
	const onSubmit = (values: Record<string, any>) => {
		profile && updateProfile(profile, values);
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
