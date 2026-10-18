import { type Resolver, useForm } from "react-hook-form";
import { FormContainer } from "react-hook-form-mui";
import { EmailOutlined, MarkEmailUnreadOutlined, PersonAddAltOutlined, PersonOutline, SendOutlined } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

import { BntRegularButton } from "@/shared/ui/buttons";
import { BntTextInputElement } from "@/shared/ui/input";

import styles from "./create-invitation-form.module.scss";
import { InvitationPanel } from "./invitation-page.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useUserValidation } from "@/hooks/validation/use-user-validation";
import { useInvitation } from "@/logic/hooks/invitation/use-invitation";
import { texts_a, texts_e, texts_f, texts_i, texts_l, texts_s, texts_u } from "@/services/localization/texts";

type TInvitationFormValues = {
	email: string;
	first_name: string;
	last_name: string;
};

const defaultValues: TInvitationFormValues = {
	email: "",
	first_name: "",
	last_name: "",
};

export function CreateInvitationForm() {
	const { t } = useBntTranslate();
	const { createInvitation } = useInvitation();
	const { formSchema } = useUserValidation();
	const resolver = yupResolver(formSchema) as Resolver<TInvitationFormValues>;
	const formContext = useForm<TInvitationFormValues>({
		defaultValues,
		resolver,
	});

	const handleSubmit = (values: TInvitationFormValues) => {
		createInvitation(values, () => formContext.reset(defaultValues));
	};

	return (
		<InvitationPanel className={styles.formPanel}>
			<div className={styles.hero}>
				<div className={styles.heroIcon}>
					<PersonAddAltOutlined fontSize="large" />
				</div>
				<div>
					<h1 className={styles.title}>{t(texts_i.invite_teammate)}</h1>
					<p className={styles.description}>{t(texts_a.add_colleague_to_team_invitation_description)}</p>
				</div>
			</div>

			<FormContainer<TInvitationFormValues> formContext={formContext} onSuccess={handleSubmit}>
				<div className={styles.form}>
					<BntTextInputElement
						fullWidth
						name="email"
						placeholder="example@company.com"
						required
						stringLabel={texts_e.email_address}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<EmailOutlined />
									</InputAdornment>
								),
							},
						}}
					/>
					<div className={styles.nameGrid}>
						<BntTextInputElement
							fullWidth
							name="first_name"
							placeholder={t(texts_f.first_name, { capitalize: true })}
							required
							stringLabel={texts_f.first_name}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<PersonOutline />
										</InputAdornment>
									),
								},
							}}
						/>
						<BntTextInputElement
							fullWidth
							name="last_name"
							placeholder={t(texts_l.last_name, { capitalize: true })}
							required
							stringLabel={texts_l.last_name}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<PersonOutline />
										</InputAdornment>
									),
								},
							}}
						/>
					</div>
					<BntRegularButton className={styles.submitButton} fullWidth type="submit" variant="contained" startIcon={<SendOutlined />}>
						{t(texts_s.send_invitation)}
					</BntRegularButton>
				</div>
			</FormContainer>

			<div className={styles.note}>
				<div className={styles.infoIcon}>
					<MarkEmailUnreadOutlined />
				</div>
				<span>{t(texts_u.user_will_receive_invitation_email)}</span>
			</div>
		</InvitationPanel>
	);
}
