import { Button, Grid, TextField, Stack, Box } from "@mui/material";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import { useAuth } from "logic/hooks/auth/use-auth";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_d, texts_e, texts_p, texts_r, texts_s } from "services/localization/texts";
import { AppRegistrationOutlined, LoginOutlined, RestoreOutlined } from "@mui/icons-material";
import BonutsFullIcon from "icons/BonutsFullIcon.svg";
import { useAuthUi } from "logic/ui/use-auth-ui";
import { useSignUp } from "logic/hooks/auth/use-sign-up";
import _ from "lodash";
import { useProjectNavigate } from "hooks/use-project-navigate";
import styles from "./login-page.module.scss";

// import { useLocationTyped } from "../../hooks/use-location-typed";
export const LoginPage: FC = () => {
	// const location = useLocationTyped();
	//	const from = location.state?.from?.pathname || "/";

	const { signIn, demoSignIn, isLogging, authError } = useAuth();
	const { showRegister } = useAuthUi();
	const { translate } = useBntTranslate();
	const { sendConfirmEmail } = useSignUp();
	const { navigateToRestorePassword } = useProjectNavigate();
	const [credentials, setValue] = useState({
		email: "",
		password: "",
	});

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...credentials, [e.currentTarget.name]: e.currentTarget.value });
	};
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		signIn({ body: credentials });
	};

	useLoader(Modules.Default, isLogging);

	const errorCode = useMemo(() => {
		if (authError && Object.hasOwn(authError, "data")) {
			return (authError as any)?.data?.errorCode;
		}
		return undefined;
	}, [authError]);

	return (
		<Box component="div" className={styles.box} sx={{ mt: 8 }}>
			<BonutsFullIcon style={{ width: "110px", height: "50px" }} />
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label={translate(texts_e.email_address, { capitalize: true })}
					name="email"
					autoComplete="email"
					onChange={onChange}
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label={translate(texts_p.password, { capitalize: true })}
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={onChange}
				/>
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					{translate(texts_s.sign_in)}
				</Button>
				<Grid container>
					<Grid item xs>
						<Button sx={{ textTransform: "none" }} onClick={demoSignIn}>
							<LoginOutlined />
							{translate(texts_d.demo, { capitalize: true })}
						</Button>
					</Grid>

					<Grid item>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<Stack flexDirection={{ xs: "column", sm: "row" }} gap={1} alignItems="flex-start">
							<Button sx={{ textTransform: "none" }} onClick={navigateToRestorePassword}>
								<RestoreOutlined color="primary" />
								{translate(texts_r.restore_password, { capitalize: true })}
							</Button>
							<Button sx={{ textTransform: "none" }} onClick={showRegister}>
								<AppRegistrationOutlined color="primary" />
								{translate(texts_s.sign_up, { capitalize: true })}
							</Button>
						</Stack>
					</Grid>
				</Grid>
				{errorCode === 5000 && (
					<Button
						fullWidth
						color="secondary"
						sx={{ textTransform: "none", mt: 4 }}
						onClick={() => {
							if (!_.isEmpty(credentials.email)) sendConfirmEmail(credentials.email);
						}}
					>
						{translate(texts_s.send_confirmation_email, { capitalize: true })}
					</Button>
				)}
			</Box>
		</Box>
	);
};
