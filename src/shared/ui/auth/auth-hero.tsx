import type { FC } from "react";
import { Stack } from "@mui/material";

import { AuthHeroRoot, AuthHeroSocialProof, AuthHeroSubtitle, AuthHeroTitle } from "./auth-panel.styles";

type TAuthHeroProps = {
	title: string;
	subtitle: string;
	socialProof: string;
};

export const AuthHero: FC<TAuthHeroProps> = ({ title, subtitle, socialProof }) => {
	return (
		<AuthHeroRoot>
			<Stack sx={{ position: "relative", zIndex: 1, height: "100%", justifyContent: "center" }}>
				<AuthHeroTitle>{title}</AuthHeroTitle>
				<AuthHeroSubtitle>{subtitle}</AuthHeroSubtitle>
				{socialProof ? <AuthHeroSocialProof>{socialProof}</AuthHeroSocialProof> : null}
			</Stack>
		</AuthHeroRoot>
	);
};
