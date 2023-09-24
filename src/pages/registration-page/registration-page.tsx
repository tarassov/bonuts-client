import { Box, Button, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_f, texts_l, texts_p, texts_s } from "services/localization/texts";
import BonutsFullIcon from "icons/BonutsFullIcon.svg";
import { useForm } from "react-hook-form";
import { BntTypography } from "shared/typography/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterValidation } from "hooks/validation/use-register-validation";
import { useSignUp } from "hooks/use-sign-up";
import styles from "./registration-page.module.scss";
import { RegisterFields } from "@/types/form/register";

export const RegistrationPage: FC = () => {
	const { formSchema } = useRegisterValidation();
	const { register: fieldRegister, handleSubmit } = useForm<RegisterFields>({
		shouldUseNativeValidation: true,
		resolver: yupResolver(formSchema),
	});
	const { isPostingRegister, register } = useSignUp();
	const { setLoading } = useLoader();
	const { translate } = useBntTranslate();

	const onSubmit = async (data: RegisterFields) => {
		const { passwordRepeat, ...args } = data;
		const r = await register({ body: args });
		// eslint-disable-next-line no-console
		console.log(r);
	};
	useEffect(() => {
		setLoading(Modules.Default, isPostingRegister);
		return () => setLoading(Modules.Default, false);
	}, [isPostingRegister]);

	return (
		<Box className={styles.box} sx={{ mt: 8 }}>
			<BonutsFullIcon style={{ width: "110px", height: "50px" }} />

			<BntTypography variant="h5" className="mt-8 mb-2">
				{translate(texts_s.sign_up, { capitalize: true })}
			</BntTypography>
			<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					fullWidth
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
					fullWidth
					required
					{...fieldRegister("last_name", { required: translate(texts_l.last_name) })}
					label={translate(texts_l.last_name, { capitalize: true })}
				/>{" "}
				<TextField
					margin="normal"
					required
					fullWidth
					{...fieldRegister("email", { required: translate(texts_e.email_address) })}
					label={translate(texts_e.email_address, { capitalize: true })}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					{...fieldRegister("password", { required: texts_p.password })}
					label={translate(texts_p.password, { capitalize: true })}
					type="password"
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					label={translate(texts_p.password_repeat, { capitalize: true })}
					{...fieldRegister("passwordRepeat", { required: texts_p.password_repeat })}
					type="password"
				/>
				<Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
					{translate(texts_s.sign_up)}
				</Button>
			</Box>
		</Box>
	);
};
