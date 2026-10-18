import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { texts_b, texts_r, texts_s } from "services/localization/texts";

import { isBlank } from "@/shared/lib/type-guards";
import { AuthPageCard } from "@/shared/ui/auth";
import { BonutsWordmarkSvg as BonutsWordmark } from "@/shared/ui/icons";
import { useLoader } from "@/shared/ui/loader";

import { Messenger } from "@/features/3cx";
import { PasswordRecoverRequest, PasswordRecoverSet, usePasswordRecover } from "@/features/auth/password-recovery";

import styles from "./recover-page.module.scss";

export const RecoverPage = () => {
	const { token } = useParams();
	const { sendRecoverEmail, changePassword, isLoading, isError } = usePasswordRecover(token);
	const { navigateToLogin } = useProjectNavigate();
	const { translate } = useBntTranslate();
	const isRequestForm = isBlank(token);

	useEffect(() => {
		if (isError) navigateToLogin();
	}, [isError, navigateToLogin]);

	useLoader(Modules.Default, isLoading);

	return (
		<>
			<Box
				className={styles.page}
				sx={(theme) => ({
					background:
						theme.palette.mode === "dark"
							? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
							: `linear-gradient(180deg, ${theme.palette.neutral.light} 0%, ${theme.palette.common.white} 100%)`,
				})}
			>
				<AuthPageCard elevation={0}>
					<Stack spacing={3.5}>
						<Stack alignItems="center" spacing={2} textAlign="center">
							<BonutsWordmark style={{ width: 128, height: 50 }} />
							<Stack spacing={1}>
								<Typography variant="h5" fontWeight={700}>
									{translate(isRequestForm ? texts_r.restore_password : texts_s.set_password, { capitalize: true })}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{translate(isRequestForm ? texts_r.recover_password_description : texts_s.set_password_description)}
								</Typography>
							</Stack>
						</Stack>
						{isRequestForm ? <PasswordRecoverRequest onSubmit={sendRecoverEmail} /> : <PasswordRecoverSet onSubmit={changePassword} />}
						<Button type="button" variant="text" startIcon={<ArrowBackOutlined />} onClick={navigateToLogin} sx={{ alignSelf: "center", textTransform: "none" }}>
							{translate(texts_b.back, { capitalize: true })}
						</Button>
					</Stack>
				</AuthPageCard>
			</Box>
			<Messenger />
		</>
	);
};
