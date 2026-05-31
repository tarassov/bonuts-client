import { useContext } from "react";
import { Avatar, IconButton, Stack, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles";

import { useAuth } from "@/shared/model/auth";
import { BntAppBar, ThemeMenu } from "@/shared/ui/menu";
import { BntStack } from "@/shared/ui/stack";
import { BntToolbar } from "@/shared/ui/toolbar";
import { BntTypography } from "@/shared/ui/typography";

import { useHeaderMenuAnchor } from "../model/use-header-menu-anchor";

import { AppHeaderMenu } from "./app-header-menu";
import styles from "./app-header-widget.module.scss";
import { AccountBalanceSmall } from "@/components/account-balance/account-balance-small";
import { BntRoutesMenu } from "@/components/main-menu/routes-menu";
import { AppContext } from "@/context/app-context";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_p } from "@/services/localization/texts";
import { CustomThemeContext } from "@/themes/theme-provider";
import type { TProfile } from "@/types/model";
import { EThemeName } from "@/types/theme";

type TAppHeaderWidgetProps = {
	profile?: TProfile | null;
};

export function AppHeaderWidget({ profile }: TAppHeaderWidgetProps) {
	const { isDrawerOpen } = useContext(AppContext);
	const { setTheme, themeName } = useContext(CustomThemeContext);
	const matchesSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const { t } = useBntTranslate();
	const { anchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useHeaderMenuAnchor();
	const profileLabel = t(texts_p.profile, { capitalize: true });
	const { auth } = useAuth();

	const handleThemeSelect = (nextThemeName: EThemeName) => {
		setTheme(nextThemeName);
	};

	return (
		<BntAppBar position="fixed" open={isDrawerOpen && matchesSmUp} fullwidth={!matchesSmUp}>
			<BntToolbar disableGutters>
				<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} className={styles.root}>
					<BntStack direction="column" gap={0} className={styles.profile}>
						<BntTypography variant="button" display="block" className={styles.truncatedText}>
							{profile?.user_name}
						</BntTypography>
						<BntTypography variant="caption" display="block" gutterBottom className={styles.truncatedText}>
							{profile?.position}
						</BntTypography>
					</BntStack>
					<BntStack direction="row" alignItems="center" gap={2}>
						{!auth.isTenantAuthenticated && <AccountBalanceSmall profile={profile || undefined} />}
						<IconButton edge="start" color="inherit" aria-label={profileLabel} onClick={handleMenuOpen}>
							<Avatar src={profile?.user_avatar?.thumb?.url || undefined} alt={profile?.user_name || profileLabel} />
						</IconButton>
						<AppHeaderMenu
							anchorEl={anchorEl}
							id="account-menu"
							open={isMenuOpen}
							onClose={handleMenuClose}
							onClick={handleMenuClose}
							slotProps={{
								paper: {
									elevation: 0,
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<BntRoutesMenu showFullName />
							<ThemeMenu themeName={themeName} onThemeSelect={handleThemeSelect} />
						</AppHeaderMenu>
					</BntStack>
				</Stack>
			</BntToolbar>
		</BntAppBar>
	);
}
