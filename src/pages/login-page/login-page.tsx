import { Box, Button, Grid, TextField, Stack } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useAuth } from "hooks/use-auth";
import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_d, texts_e, texts_p, texts_r, texts_s } from "services/localization/texts";
import { AppRegistrationOutlined, LoginOutlined, RestoreOutlined } from "@mui/icons-material";
import BonutsFullIcon from "icons/BonutsFullIcon.svg";
import styles from "./login-page.module.scss";

// import { useLocationTyped } from "../../hooks/use-location-typed";
export const LoginPage: FC = () => {
	// const location = useLocationTyped();
	//	const from = location.state?.from?.pathname || "/";

	const { signIn, demoSignIn, isLogging } = useAuth();
	const { setLoading } = useLoader();
	const { translate } = useBntTranslate();
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

	useEffect(() => {
		setLoading(Modules.Default, isLogging);
		return () => setLoading(Modules.Default, false);
	}, [isLogging]);

	return (
		<Box className={styles.box} sx={{ mt: 8 }}>
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
							<Button sx={{ textTransform: "none" }}>
								<RestoreOutlined color="primary" />
								{translate(texts_r.restore_password, { capitalize: true })}
							</Button>
							<Button sx={{ textTransform: "none" }}>
								<AppRegistrationOutlined color="primary" />
								{translate(texts_s.sign_up, { capitalize: true })}
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
