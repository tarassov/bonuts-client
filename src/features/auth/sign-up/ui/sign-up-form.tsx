import type { FC } from "react";
import { useForm } from "react-hook-form";
import { BadgeOutlined, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { Alert, InputAdornment, Stack } from "@mui/material";

import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useRegisterValidation } from "hooks/validation/use-register-validation";
import { texts_e, texts_f, texts_l, texts_p, texts_s } from "services/localization/texts";

import { useResponseErrorMessage } from "@/shared/lib/notification";
import { AuthSubmitButton, AuthTextField } from "@/shared/ui/auth";
import { useLoader } from "@/shared/ui/loader";

import { useSignUp } from "../model/use-sign-up";

import { yupResolver } from "@hookform/resolvers/yup";
import type { RegisterFields } from "@/types/form/register";

export const SignUpForm: FC = () => {
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
	const { translate } = useBntTranslate();
	const { getLocalizedResponseErrorMessage } = useResponseErrorMessage();
	const registerErrorText = getLocalizedResponseErrorMessage(registerError);

	useLoader(Modules.Default, isPostingRegister);

	const onSubmit = async (data: RegisterFields) => {
		const { passwordRepeat, ...credentials } = data;

		await register({ body: credentials });
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate spacing={2.5}>
			<AuthTextField
				error={!!errors.first_name}
				helperText={errors.first_name?.message}
				required
				fullWidth
				{...fieldRegister("first_name", { required: translate(texts_f.first_name) })}
				label={translate(texts_f.first_name, { capitalize: true })}
				variant="standard"
				autoComplete="given-name"
				autoFocus
				slotProps={{
					inputLabel: { shrink: true },
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<BadgeOutlined fontSize="small" />
							</InputAdornment>
						),
					},
				}}
			/>
			<AuthTextField
				error={!!errors.last_name}
				helperText={errors.last_name?.message}
				required
				fullWidth
				{...fieldRegister("last_name", { required: translate(texts_l.last_name) })}
				label={translate(texts_l.last_name, { capitalize: true })}
				variant="standard"
				autoComplete="family-name"
				slotProps={{
					inputLabel: { shrink: true },
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<BadgeOutlined fontSize="small" />
							</InputAdornment>
						),
					},
				}}
			/>
			<AuthTextField
				error={!!errors.email}
				helperText={errors.email?.message}
				required
				fullWidth
				id="email"
				type="email"
				{...fieldRegister("email", { required: translate(texts_e.email_address) })}
				label={translate(texts_e.email_address, { capitalize: true })}
				variant="standard"
				autoComplete="email"
				slotProps={{
					inputLabel: { shrink: true },
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<EmailOutlined fontSize="small" />
							</InputAdornment>
						),
					},
				}}
			/>
			<AuthTextField
				error={!!errors.password}
				helperText={errors.password?.message}
				required
				fullWidth
				{...fieldRegister("password", { required: texts_p.password })}
				label={translate(texts_p.password, { capitalize: true })}
				type="password"
				variant="standard"
				autoComplete="new-password"
				slotProps={{
					inputLabel: { shrink: true },
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<LockOutlined fontSize="small" />
							</InputAdornment>
						),
					},
				}}
			/>
			<AuthTextField
				error={!!errors.passwordRepeat}
				helperText={errors.passwordRepeat?.message}
				required
				fullWidth
				label={translate(texts_p.password_repeat, { capitalize: true })}
				{...fieldRegister("passwordRepeat", { required: texts_p.password_repeat })}
				type="password"
				variant="standard"
				autoComplete="new-password"
				slotProps={{
					inputLabel: { shrink: true },
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<LockOutlined fontSize="small" />
							</InputAdornment>
						),
					},
				}}
			/>
			<AuthSubmitButton type="submit" variant="contained" fullWidth size="large" disabled={isPostingRegister}>
				{translate(texts_s.sign_up, { capitalize: true })}
			</AuthSubmitButton>
			{registerErrorText ? <Alert severity="error">{registerErrorText}</Alert> : null}
		</Stack>
	);
};
