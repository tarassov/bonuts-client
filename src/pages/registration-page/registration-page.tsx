import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, FormHelperText, TextField } from "@mui/material";

import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useRegisterValidation } from "hooks/validation/use-register-validation";
import { texts_e, texts_f, texts_l, texts_p, texts_s } from "services/localization/texts";

import { getResponseErrorMessage } from "@/shared/lib/notification";
import BonutsFullIcon from "@/shared/ui/icons/BonutsFullIcon.svg";
import { useLoader } from "@/shared/ui/loader";
import { BntTypography } from "@/shared/ui/typography/typography";

import { Messenger } from "@/features/3cx/messenger";

import styles from "./registration-page.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUp } from "logic/hooks/auth/use-sign-up";
import type { RegisterFields } from "@/types/form/register";

const getErrorMessage = (message: unknown): string | undefined => {
	return typeof message === "string" ? message : undefined;
};

export const RegistrationPage: FC = () => {
	const { formSchema } = useRegisterValidation();
	const {
		register: fieldRegister,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFields>({
		shouldUseNativeValidation: false,
		resolver: yupResolver(formSchema),
	});
	const { isPostingRegister, register, registerError } = useSignUp();
	const registerErrorText = getResponseErrorMessage(registerError);

	const { translate } = useBntTranslate();

	const onSubmit = async (data: RegisterFields) => {
		const { passwordRepeat, ...args } = data;
		await register({ body: args });
	};

	useLoader(Modules.Default, isPostingRegister);

	return (
		<>
			<Box component="div" className={styles.box} sx={{ mt: 8 }}>
				<BonutsFullIcon style={{ width: "110px", height: "50px" }} />

				<BntTypography variant="h5" className="mt-8 mb-2">
					{translate(texts_s.sign_up, { capitalize: true })}
				</BntTypography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						fullWidth
						error={!!errors.first_name}
						helperText={getErrorMessage(errors.first_name?.message)}
						required
						{...fieldRegister("first_name", {
							required: translate(texts_f.first_name),
							pattern: /^\S+@\S+$/i,
						})}
						label={translate(texts_f.first_name, { capitalize: true })}
						autoFocus
					/>
					<TextField
						margin="normal"
						error={!!errors.last_name}
						helperText={getErrorMessage(errors.last_name?.message)}
						fullWidth
						required
						{...fieldRegister("last_name", { required: translate(texts_l.last_name) })}
						label={translate(texts_l.last_name, { capitalize: true })}
					/>
					<TextField
						margin="normal"
						error={!!errors.email}
						helperText={getErrorMessage(errors.email?.message)}
						required
						fullWidth
						{...fieldRegister("email", { required: translate(texts_e.email_address) })}
						label={translate(texts_e.email_address, { capitalize: true })}
					/>
					<TextField
						margin="normal"
						error={!!errors.password}
						helperText={getErrorMessage(errors.password?.message)}
						required
						fullWidth
						{...fieldRegister("password", { required: texts_p.password })}
						label={translate(texts_p.password, { capitalize: true })}
						type="password"
					/>
					<TextField
						margin="normal"
						error={!!errors.passwordRepeat}
						helperText={getErrorMessage(errors.passwordRepeat?.message)}
						required
						fullWidth
						label={translate(texts_p.password_repeat, { capitalize: true })}
						{...fieldRegister("passwordRepeat", { required: texts_p.password_repeat })}
						type="password"
					/>
					<Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
						{translate(texts_s.sign_up)}
					</Button>
					{registerErrorText && <FormHelperText error>{registerErrorText}</FormHelperText>}
				</Box>
			</Box>
			<Messenger />
		</>
	);
};
