import type { FC } from "react";
import { useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, CircularProgress, Divider, TextField, Typography } from "@mui/material";

import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useIcons } from "hooks/use-icons";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { texts_d, texts_e, texts_p, texts_r, texts_s, texts_v } from "services/localization/texts";
import { present } from "shared/lib/type-guards";
import { useAuth } from "shared/model/auth/use-auth";
import BonutsWordmark from "shared/ui/icons/bonuts_wordmark.svg";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Messenger } from "@/features/3cx/messenger";
import { openVkLoginWindow } from "@/features/profile/vk";

import styles from "./login-page.module.scss";
import { useSignUp } from "logic/hooks/auth/use-sign-up";

type LoginFormValues = {
	email: string;
	password: string;
};

type TApiErrorData = {
	errorCode?: number;
	message?: string;
	errorText?: string;
};

export const LoginPage: FC = () => {
	const { signIn, demoSignIn, isLogging, authError, checkAuth } = useAuth();
	const { translate } = useBntTranslate();
	const { sendConfirmEmail } = useSignUp();
	const { navigateToRestorePassword, navigateToSignUp } = useProjectNavigate();
	const { Vk } = useIcons({ width: 18, height: 18, color: "#0077FF" });
	const [isVkLoading, setIsVkLoading] = useState(false);
	const [vkError, setVkError] = useState<string>();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	useLoader(Modules.Default, isLogging);

	const authErrorData = useMemo(() => {
		if (authError && typeof authError === "object" && "data" in authError) {
			return (authError.data || {}) as TApiErrorData;
		}
		return undefined;
	}, [authError]);

	const errorCode = useMemo(() => {
		return authErrorData?.errorCode;
	}, [authErrorData]);

	const emailValue = watch("email") || "";
	const passwordValue = watch("password") || "";
	const isFormDisabled = !emailValue.trim() || !passwordValue || isLogging || isVkLoading;
	const passwordErrorText = errors.password?.message || (!errors.password ? authErrorData?.message || authErrorData?.errorText : undefined);

	const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
		setVkError(undefined);
		await signIn({
			body: {
				email: values.email.trim(),
				password: values.password,
			},
		});
	};

	const handleVkLogin = () => {
		setVkError(undefined);
		setIsVkLoading(true);

		openVkLoginWindow(async (response) => {
			setIsVkLoading(false);

			if (response.success) {
				await checkAuth();
				return;
			}

			setVkError(typeof response.error === "string" ? response.error : translate(texts_v.vk_error_description));
		});
	};

	return (
		<Box component="div" className={styles.page}>
			<Messenger />
			<Box className={styles.shell}>
				<Box className={styles.card}>
					<Box className={styles.brand}>
						<BonutsWordmark style={{ width: "128px", height: "50px" }} />
					</Box>
					<Box className={styles.header}>
						<Typography variant="h5" fontWeight={700}>
							{translate(texts_v.login_page_title)}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{translate(texts_v.login_page_subtitle)}
						</Typography>
					</Box>
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
						<Box className={styles.fields}>
							<Box className={styles.field}>
								<TextField
									required
									fullWidth
									id="email"
									label={translate(texts_e.email_address, { capitalize: true })}
									variant="standard"
									InputLabelProps={{ shrink: true }}
									autoComplete="email"
									autoFocus
									error={!!errors.email}
									helperText={errors.email?.message || " "}
									{...register("email", {
										required: "Введите email",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Введите корректный email",
										},
									})}
								/>
							</Box>
							<Box className={styles.field}>
								<TextField
									required
									fullWidth
									id="password"
									label={translate(texts_p.password, { capitalize: true })}
									variant="standard"
									InputLabelProps={{ shrink: true }}
									type="password"
									autoComplete="current-password"
									error={!!errors.password || (!!passwordErrorText && !errors.password)}
									helperText={passwordErrorText || " "}
									{...register("password", {
										required: "Введите пароль",
									})}
								/>
							</Box>
						</Box>
						<Box className={styles.actions}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								size="large"
								disabled={isFormDisabled}
								endIcon={isLogging ? <CircularProgress size={18} color="inherit" /> : undefined}
								sx={{
									minHeight: 48,
									borderRadius: 3,
									"&.Mui-disabled": {
										backgroundColor: "#f9b785",
										color: "rgba(30, 31, 37, 0.78)",
									},
								}}
							>
								{translate(texts_s.sign_in, { capitalize: true })}
							</Button>
							<Divider>{translate(texts_v.or)}</Divider>
							<Button
								type="button"
								fullWidth
								variant="outlined"
								size="large"
								className={styles.vkButton}
								disabled={isLogging || isVkLoading}
								onClick={handleVkLogin}
								startIcon={<Vk />}
								endIcon={isVkLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
								sx={{ minHeight: 48, borderRadius: 3 }}
							>
								{translate(isVkLoading ? texts_v.login_with_vk_loading : texts_v.login_with_vk)}
							</Button>
							{vkError ? <Alert severity="error">{vkError}</Alert> : null}
						</Box>
						<Box className={styles.links}>
							<Button type="button" className={`${styles.linkButton} ${styles.registerButton}`} variant="text" sx={{ textTransform: "none" }} onClick={navigateToSignUp}>
								{translate(texts_s.sign_up, { capitalize: true })}
							</Button>
							<Typography variant="body2" className={styles.linkSeparator}>
								/
							</Typography>
							<Button type="button" className={styles.linkButton} variant="text" sx={{ textTransform: "none" }} onClick={navigateToRestorePassword}>
								{translate(texts_r.restore_password, { capitalize: true })}
							</Button>
							<Typography variant="body2" className={styles.linkSeparator}>
								/
							</Typography>
							<Button type="button" className={styles.linkButton} variant="text" sx={{ textTransform: "none" }} disabled={isLogging || isVkLoading} onClick={demoSignIn}>
								{translate(texts_d.demo, { capitalize: true })}
							</Button>
						</Box>
						{errorCode === 5000 && (
							<Button
								type="button"
								fullWidth
								color="secondary"
								className={styles.confirmButton}
								sx={{ textTransform: "none" }}
								onClick={() => {
									if (present(emailValue.trim())) sendConfirmEmail(emailValue.trim());
								}}
							>
								{translate(texts_s.send_confirmation_email, { capitalize: true })}
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
