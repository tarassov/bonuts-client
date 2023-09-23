import { Box, Button, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useAuth } from "hooks/use-auth";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e, texts_p, texts_s } from "services/localization/texts";
import BonutsFullIcon from "icons/BonutsFullIcon.svg";
import { useForm } from "react-hook-form";
import { BntTypography } from "shared/typography/typography";
import styles from "./registration-page.module.scss";

type RegisterFields = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	passwordRepeat: string;
};
export const RegistrationPage: FC = () => {
	const { register: fieldRegister, handleSubmit } = useForm<RegisterFields>({
		shouldUseNativeValidation: true,
	});
	const { isPostingRegister } = useAuth();
	const { setLoading } = useLoader();
	const { translate } = useBntTranslate();

	const onSubmit = async () => {
		// console.info({ body: data });
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
					required
					fullWidth
					{...fieldRegister("email", { required: translate(texts_e.email_address) })}
					label={translate(texts_e.email_address, { capitalize: true })}
					autoFocus
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
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					{translate(texts_s.sign_in)}
				</Button>
			</Box>
		</Box>
	);
};
