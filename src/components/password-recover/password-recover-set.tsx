import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p, texts_s } from "services/localization/texts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { usePasswordSetValidation } from "hooks/validation/use-password-set-validation";
import { PasswordSetFields } from "@/types/form/password-set";

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

	const doSubmit = async (data: PasswordSetFields) => {
		const { ...args } = data;
		onSubmit(args.password);
	};

	return (
		<Box component="div" sx={{ mt: 8 }}>
			<Box component="form" onSubmit={handleSubmit(doSubmit)} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					error={!!errors.password}
					helperText={errors.password?.message}
					required
					fullWidth
					{...fieldRegister("password", { required: texts_p.password })}
					label={translate(texts_p.password, { capitalize: true })}
					type="password"
				/>
				<TextField
					margin="normal"
					error={!!errors.passwordRepeat}
					helperText={errors.passwordRepeat?.message}
					required
					fullWidth
					label={translate(texts_p.password_repeat, { capitalize: true })}
					{...fieldRegister("passwordRepeat", { required: texts_p.password_repeat })}
					type="password"
				/>
				<Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
					{translate(texts_s.set_password, { capitalize: true })}
				</Button>
			</Box>
		</Box>
	);
};
