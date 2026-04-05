import type { FC } from "react";
import { useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { ICON_VARIANTS, useIcons } from "hooks/use-icons";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { useLoginValidation } from "hooks/validation/use-login-validation";
import { texts_l, texts_s, texts_v } from "services/localization/texts";
import { present } from "shared/lib/type-guards";
import { useAuth } from "shared/model/auth/use-auth";
import { AuthFormPanel, AuthHero } from "shared/ui/auth";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { Messenger } from "@/features/3cx/messenger";
import { openVkLoginWindow } from "@/features/profile/vk";

import styles from "./login-page.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUp } from "logic/hooks/auth/use-sign-up";
import type { TLoginFields } from "@/types/form/login";

type TApiErrorData = {
	errorCode?: number;
	message?: string;
	errorText?: string;
};

export const LoginPage: FC = () => {
	const { signIn, demoSignIn, isLogging, authError, checkAuth } = useAuth();
	const { translate } = useBntTranslate();
	const { formSchema } = useLoginValidation();
	const { sendConfirmEmail } = useSignUp();
	const { navigateToRestorePassword, navigateToSignUp } = useProjectNavigate();
	const { Vk } = useIcons({ width: 18, height: 18, variant: ICON_VARIANTS.INFO });
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<TLoginFields>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
		resolver: yupResolver(formSchema),
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
	const isFormDisabled = !emailValue.trim() || !passwordValue || isLogging;
	const passwordErrorText = errors.password?.message || (!errors.password ? authErrorData?.message || authErrorData?.errorText : undefined);

	const onSubmit: SubmitHandler<TLoginFields> = async (values) => {
		await signIn({
			body: {
				email: values.email.trim(),
				password: values.password,
			},
		});
	};

	const handleVkLogin = async (): Promise<string | void> => {
		return new Promise((resolve) => {
			openVkLoginWindow(async (response) => {
				if (response.success) {
					await checkAuth();
					resolve();

					return;
				}

				if (response.error === texts_v.vk_auth_cancelled) {
					resolve(translate(texts_v.vk_auth_cancelled));

					return;
				}

				resolve(typeof response.error === "string" ? response.error : translate(texts_v.vk_error_description));
			});
		});
	};

	const handleSendConfirmationEmail = () => {
		if (present(emailValue.trim())) {
			sendConfirmEmail(emailValue.trim());
		}
	};

	return (
		<Box
			component="div"
			className={styles.page}
			sx={(theme) => ({
				background: `linear-gradient(180deg, ${theme.palette.neutral.light} 0%, ${theme.palette.common.white} 100%)`,
			})}
		>
			<Messenger />
			<Box className={styles.shell}>
				<Box
					className={styles.card}
					sx={(theme) => ({
						backgroundColor: theme.palette.common.white,
						border: `1px solid ${alpha(theme.palette.text.secondary, 0.12)}`,
						boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.08)}, 0 12px 32px ${alpha(theme.palette.common.black, 0.06)}`,
					})}
				>
					<AuthHero title={translate(texts_l.login_page_hero_title)} subtitle={translate(texts_l.login_page_hero_subtitle)} socialProof={translate(texts_l.login_page_social_proof)} />
					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on" className={styles.form}>
						<AuthFormPanel
							translate={translate}
							register={register}
							errors={errors}
							passwordErrorText={passwordErrorText}
							isFormDisabled={isFormDisabled}
							isLogging={isLogging}
							onRestorePassword={navigateToRestorePassword}
							onSignUp={navigateToSignUp}
							onVkLogin={handleVkLogin}
							onDemoSignIn={demoSignIn}
							Vk={Vk}
						>
							{errorCode === 5000 && (
								<Button type="button" fullWidth color="secondary" sx={{ textTransform: "none" }} onClick={handleSendConfirmationEmail}>
									{translate(texts_s.send_confirmation_email, { capitalize: true })}
								</Button>
							)}
						</AuthFormPanel>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
