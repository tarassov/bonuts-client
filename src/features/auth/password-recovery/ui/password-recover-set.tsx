import type { FC } from "react";
import { useForm } from "react-hook-form";
import { LockOutlined } from "@mui/icons-material";
import { InputAdornment, Stack } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { usePasswordSetValidation } from "hooks/validation/use-password-set-validation";
import { texts_p, texts_s } from "services/localization/texts";

import { AuthSubmitButton, AuthTextField } from "@/shared/ui/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import type { PasswordSetFields } from "@/types/form/password-set";

export const PasswordRecoverSet: FC<{ onSubmit: (password: string) => void }> = ({ onSubmit }) => {
	const { formSchema } = usePasswordSetValidation();
	const {
		register: fieldRegister,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordSetFields>({
		shouldUseNativeValidation: false,
		resolver: yupResolver(formSchema),
	});
	const { translate } = useBntTranslate();

	const doSubmit = (data: PasswordSetFields) => {
		const { password } = data;

		onSubmit(password);
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(doSubmit)} noValidate spacing={2.5}>
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
				autoFocus
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
			<AuthSubmitButton type="submit" variant="contained" fullWidth size="large">
				{translate(texts_s.set_password, { capitalize: true })}
			</AuthSubmitButton>
		</Stack>
	);
};
