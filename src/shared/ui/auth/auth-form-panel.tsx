import type { ComponentType, FC, ReactNode } from "react";
import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Alert, CircularProgress, Divider, IconButton, InputAdornment, Stack, Tooltip, Typography } from "@mui/material";

import { texts_a, texts_d, texts_e, texts_h, texts_l, texts_o, texts_p, texts_r, texts_s } from "services/localization/texts";
import BonutsWordmark from "shared/ui/icons/bonuts_wordmark.svg";

import { AuthAccentTextButton, AuthDemoButton, AuthFormColumn, AuthOutlinedButton, AuthSubmitButton, AuthTextButton, AuthTextField } from "./auth-panel.styles";
import type { TLoginFields } from "@/types/form/login";

type TTranslate = (key: string, options?: { capitalize?: boolean }) => string;

type TAuthFormPanelProps = {
	translate: TTranslate;
	register: UseFormRegister<TLoginFields>;
	errors: FieldErrors<TLoginFields>;
	passwordErrorText?: string;
	isFormDisabled: boolean;
	isLogging: boolean;
	onRestorePassword: VoidFunction;
	onSignUp: VoidFunction;
	onVkLogin: () => Promise<string | void>;
	onDemoSignIn: VoidFunction;
	Vk: ComponentType;
	children?: ReactNode;
};

export const AuthFormPanel: FC<TAuthFormPanelProps> = ({
	translate,
	register,
	errors,
	passwordErrorText,
	isFormDisabled,
	isLogging,
	onRestorePassword,
	onSignUp,
	onVkLogin,
	onDemoSignIn,
	Vk,
	children,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isVkLoading, setIsVkLoading] = useState(false);
	const [vkError, setVkError] = useState<string>();
	const submitDisabledReason = isLogging ? translate(texts_a.auth_action_in_progress) : translate(texts_a.auth_fill_required_fields);
	const secondaryDisabledReason = translate(texts_a.auth_action_in_progress);

	const handleVkLogin = async () => {
		setVkError(undefined);
		setIsVkLoading(true);

		try {
			const errorMessage = await onVkLogin();
			if (errorMessage) {
				setVkError(errorMessage);
			}
		} finally {
			setIsVkLoading(false);
		}
	};

	return (
		<AuthFormColumn>
			<Stack sx={{ justifyContent: "center", width: "100%", alignItems: "center" }}>
				<BonutsWordmark style={{ width: "128px", height: "50px" }} />
			</Stack>
			<Stack sx={{ alignItems: "center", gap: 2, textAlign: "center" }}>
				<Typography variant="h5" fontWeight={700}>
					{translate(texts_l.login_page_title)}
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, display: { md: "none" } }}>
					{translate(texts_l.login_page_subtitle)}
				</Typography>
			</Stack>
			<Stack spacing={2}>
				<Stack spacing={1.75}>
					<AuthTextField
						required
						fullWidth
						id="email"
						label={translate(texts_e.email_address, { capitalize: true })}
						variant="standard"
						slotProps={{
							inputLabel: {
								shrink: true,
							},
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<EmailOutlined fontSize="small" />
									</InputAdornment>
								),
							},
						}}
						autoComplete="email"
						autoFocus
						error={!!errors.email}
						helperText={errors.email?.message || " "}
						{...register("email")}
					/>
					<AuthTextField
						required
						fullWidth
						id="password"
						label={translate(texts_p.password, { capitalize: true })}
						variant="standard"
						type={isPasswordVisible ? "text" : "password"}
						autoComplete="current-password"
						slotProps={{
							inputLabel: {
								shrink: true,
							},
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<LockOutlined fontSize="small" />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={translate(isPasswordVisible ? texts_h.hide_password : texts_s.show_password)}
											edge="end"
											onClick={() => setIsPasswordVisible((prevState) => !prevState)}
											onMouseDown={(event) => event.preventDefault()}
										>
											{isPasswordVisible ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
						error={!!errors.password || (!!passwordErrorText && !errors.password)}
						helperText={passwordErrorText || " "}
						{...register("password")}
					/>
				</Stack>
				<Stack spacing={1.5}>
					<Tooltip title={isFormDisabled ? submitDisabledReason : ""} disableHoverListener={!isFormDisabled}>
						<span>
							<AuthSubmitButton type="submit" fullWidth variant="contained" size="large" disabled={isFormDisabled} endIcon={isLogging ? <CircularProgress size={18} color="inherit" /> : undefined}>
								{translate(texts_s.sign_in, { capitalize: true })}
							</AuthSubmitButton>
						</span>
					</Tooltip>
					<Stack alignItems="baseline" gap={2} spacing={0.75} sx={{ flexDirection: { sm: "row" }, justifyContent: { sm: "center" } }}>
						<AuthTextButton type="button" variant="text" onClick={onRestorePassword}>
							{translate(texts_r.restore_password, { capitalize: true })}
						</AuthTextButton>
						<Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "inline-flex" }, alignItems: "center" }}>
							/
						</Typography>
						<AuthAccentTextButton type="button" variant="text" onClick={onSignUp}>
							{translate(texts_s.sign_up, { capitalize: true })}
						</AuthAccentTextButton>
					</Stack>
					<Divider>{translate(texts_o.or)}</Divider>
					<Tooltip title={isLogging || isVkLoading ? secondaryDisabledReason : ""} disableHoverListener={!(isLogging || isVkLoading)}>
						<span>
							<AuthOutlinedButton
								type="button"
								fullWidth
								variant="outlined"
								size="large"
								disabled={isLogging || isVkLoading}
								onClick={handleVkLogin}
								startIcon={<Vk />}
								endIcon={isVkLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
							>
								{translate(isVkLoading ? texts_l.login_with_vk_loading : texts_l.login_with_vk)}
							</AuthOutlinedButton>
						</span>
					</Tooltip>
					{vkError ? <Alert severity="error">{vkError}</Alert> : null}
				</Stack>
				<Divider sx={{ my: "2px" }} />
				<Stack alignItems="center" spacing={2} textAlign="center">
					<Typography variant="body1" sx={{ maxWidth: 320, lineHeight: 1.6, color: "rgba(73, 73, 91, 0.78)" }}>
						{translate(texts_l.login_page_invite)}
					</Typography>
					<Tooltip title={isLogging || isVkLoading ? secondaryDisabledReason : ""} disableHoverListener={!(isLogging || isVkLoading)}>
						<AuthDemoButton type="button" fullWidth variant="outlined" disabled={isLogging || isVkLoading} onClick={onDemoSignIn}>
							{translate(texts_d.demo, { capitalize: true })}
						</AuthDemoButton>
					</Tooltip>
				</Stack>
				{children}
			</Stack>
		</AuthFormColumn>
	);
};
