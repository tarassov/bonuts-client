import type { FC } from "react";
import { useForm } from "react-hook-form";
import { EmailOutlined } from "@mui/icons-material";
import { InputAdornment, Stack } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { usePasswordRestoreValidation } from "hooks/validation/use-password-restore-validation";
import { texts_e, texts_r } from "services/localization/texts";

import { AuthSubmitButton, AuthTextField } from "@/shared/ui/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import type { PasswordRestoreFields } from "@/types/form/password-restore";

export const PasswordRecoverRequest: FC<{ onSubmit: (email: string) => void }> = ({ onSubmit }) => {
	const { formSchema } = usePasswordRestoreValidation();
	const {
		register: fieldRegister,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordRestoreFields>({
		shouldUseNativeValidation: false,
		resolver: yupResolver(formSchema),
	});
	const { translate } = useBntTranslate();

	const doSubmit = (data: PasswordRestoreFields) => {
		onSubmit(data.email);
	};

	return (
		<Stack component="form" onSubmit={handleSubmit(doSubmit)} noValidate spacing={2.5}>
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
				autoFocus
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
			<AuthSubmitButton type="submit" variant="contained" fullWidth size="large">
				{translate(texts_r.restore_password, { capitalize: true })}
			</AuthSubmitButton>
		</Stack>
	);
};
