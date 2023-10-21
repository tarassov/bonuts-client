import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_r } from "services/localization/texts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { usePasswordRestoreValidation } from "hooks/validation/use-password-restore-validation";

import { PasswordRestoreFields } from "@/types/form/password-restore";

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

	const doSubmit = async (data: PasswordRestoreFields) => {
		const { ...args } = data;
		onSubmit(args.email);
	};

	return (
		<Box sx={{ mt: 8 }}>
			<Box component="form" onSubmit={handleSubmit(doSubmit)} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					error={!!errors.email}
					helperText={errors.email?.message}
					required
					fullWidth
					{...fieldRegister("email", { required: translate(texts_e.email_address) })}
					label={translate(texts_e.email_address, { capitalize: true })}
				/>

				<Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
					{translate(texts_r.restore_password, { capitalize: true })}
				</Button>
			</Box>
		</Box>
	);
};
