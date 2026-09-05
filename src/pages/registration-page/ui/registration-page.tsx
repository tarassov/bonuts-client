import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useProjectNavigate } from "hooks/use-project-navigate";
import { texts_b, texts_s } from "services/localization/texts";

import { AuthPageCard } from "@/shared/ui/auth";
import { BonutsWordmarkSvg as BonutsWordmark } from "@/shared/ui/icons";

import { Messenger } from "@/features/3cx";
import { SignUpForm } from "@/features/auth/sign-up";

import styles from "./registration-page.module.scss";

export const RegistrationPage = () => {
	const { translate } = useBntTranslate();
	const { navigateToLogin } = useProjectNavigate();

	return (
		<>
			<Box
				className={styles.box}
				sx={(theme) => ({
					background:
						theme.palette.mode === "dark"
							? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
							: `linear-gradient(180deg, ${theme.palette.neutral.light} 0%, ${theme.palette.common.white} 100%)`,
				})}
			>
				<AuthPageCard elevation={0} sx={{ width: "min(100%, 560px)" }}>
					<Stack spacing={3.5}>
						<Stack alignItems="center" spacing={2} textAlign="center">
							<BonutsWordmark style={{ width: 128, height: 50 }} />
							<Stack spacing={1}>
								<Typography variant="h5" fontWeight={700}>
									{translate(texts_s.sign_up, { capitalize: true })}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{translate(texts_s.sign_up_description)}
								</Typography>
							</Stack>
						</Stack>
						<SignUpForm />
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
