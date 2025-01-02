import { TFormProps } from "shared/ui/form/types/bnt-form";
import { useInvitationFormFields } from "components/invitation/use-invitation-form-fields";
import { BntForm } from "shared/ui/form/bnt-form";
import { useInvitation } from "logic/hooks/invitation/use-invitation";
import { BntStack } from "shared/ui/stack/stack";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTypography } from "shared/ui/typography/typography";
import { useUserValidation } from "hooks/validation/use-user-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { TUser } from "@/types/model";
import { texts_n } from "@/services/localization/texts";

export const CreateInvitationForm = () => {
	const { fields } = useInvitationFormFields();
	const { create } = useInvitation();
	const { t } = useBntTranslate();
	const { formSchema } = useUserValidation();
	const resolver = yupResolver(formSchema);

	const formProps: TFormProps<TUser> = { fields, formId: "create-invitation", resolver };

	const onSubmit = (values: TUser) => {
		create(values);
	};
	return (
		<div className="p-5">
			<BntStack maxWidth={400} border={1} borderRadius={2} padding={2}>
				<BntTypography variant="h6">
					{t(texts_n.new_invitation, { capitalize: true })}
				</BntTypography>
				<BntForm {...formProps} onSubmit={onSubmit} />
			</BntStack>
		</div>
	);
};
