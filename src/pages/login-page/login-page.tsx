import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
	Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { FC, SyntheticEvent, useState } from "react";
import styles from "./login-page.module.css";
import { useAuth } from "../../hooks/use-auth";
//import { useLocationTyped } from "../../hooks/use-location-typed";
const LoginPage: FC = () => {
	//const location = useLocationTyped();
	//	const from = location.state?.from?.pathname || "/";

	const { signIn, isLoading } = useAuth();

	const [credentials, setValue] = useState({
		email: "",
		password: "",
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...credentials, [e.currentTarget.name]: e.currentTarget.value });
	};
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		signIn({ body: credentials });
	};

	if (isLoading) {
		return <div>Logging in...</div>;
	}

	return (
		<Box className={styles.box} sx={{ mt: 8 }}>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
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
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={onChange}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href="#" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default LoginPage;
