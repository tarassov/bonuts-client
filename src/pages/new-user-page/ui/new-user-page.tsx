import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { BntRoutes } from "@/shared/config/routes";
import { getTenantlessUserState, TenantlessUserState } from "@/shared/model/auth";
import { useLoader } from "@/shared/ui/loader";

import { Messenger } from "@/features/3cx";

import { getWelcomeInvitationPreview, getWelcomeUserEmail, getWelcomeUserInitials, getWelcomeUserName } from "../model/user-invitations-page-helper";

import styles from "./new-user-page.module.scss";
import { NewUserPageRoot } from "./new-user-page.styles";
import { WelcomeAccountSection } from "./welcome-account-section";
import { WelcomeCreateTeamSection } from "./welcome-create-team-section";
import { WelcomeDangerZoneSection } from "./welcome-danger-zone-section";
import { WelcomeHero } from "./welcome-hero";
import { WelcomeInvitationsSection } from "./welcome-invitations-section";
import { Modules } from "@/constants/modules";
import { useInvitationLoaderList } from "@/logic/hooks/invitation/use-invitation-loader-list";
import { useTenantsLoaderList } from "@/logic/hooks/tenant/use-tenants-loader-list";
import { routesPath } from "@/routes/config/routes-path";

export const NewUserPage: FC = () => {
	const { objects: invitations, isLoading: isInvitationsLoading } = useInvitationLoaderList();
	const { objects: tenants, isLoading: isTenantsLoading } = useTenantsLoaderList();
	const [isShowingAllInvitations, setIsShowingAllInvitations] = useState(false);

	useLoader(Modules.MyInvitations, isInvitationsLoading);
	useLoader(Modules.MyTenants, isTenantsLoading);

	const isInitialLoading = (isInvitationsLoading || isTenantsLoading) && !invitations.length && !tenants.length;
	const nextState = getTenantlessUserState(tenants);
	const previewInvitations = useMemo(() => getWelcomeInvitationPreview(invitations), [invitations]);
	const visibleInvitations = isShowingAllInvitations ? invitations : previewInvitations;
	const userName = getWelcomeUserName(invitations);
	const userEmail = getWelcomeUserEmail(invitations);
	const userInitials = getWelcomeUserInitials(invitations);
	const handleShowAllInvitations = useCallback(() => {
		setIsShowingAllInvitations(true);
	}, []);

	if (isInitialLoading) {
		return (
			<NewUserPageRoot>
				<div className={styles.loader}>
					<CircularProgress size={28} />
				</div>
			</NewUserPageRoot>
		);
	}

	if (nextState === TenantlessUserState.Tenants) {
		return <Navigate to={routesPath[BntRoutes.TenantList]} replace />;
	}

	return (
		<NewUserPageRoot>
			<div className={styles.page}>
				<WelcomeHero userName={userName} />
				<WelcomeAccountSection userEmail={userEmail} userInitials={userInitials} />
				<WelcomeInvitationsSection
					invitations={visibleInvitations}
					totalInvitationsCount={invitations.length}
					isShowingAllInvitations={isShowingAllInvitations}
					onShowAllInvitations={handleShowAllInvitations}
				/>
				<WelcomeCreateTeamSection />
				<WelcomeDangerZoneSection />
			</div>
			<Messenger />
		</NewUserPageRoot>
	);
};
