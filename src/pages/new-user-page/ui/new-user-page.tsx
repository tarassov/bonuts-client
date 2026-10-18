import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import { BntRoutes } from "@/shared/config/routes";
import { present } from "@/shared/lib/type-guards";
import { getTenantlessUserState, TenantlessUserState } from "@/shared/model/auth";
import { useLoader } from "@/shared/ui/loader";

import { Messenger } from "@/features/3cx";

import { getWelcomeInvitationPreview, getWelcomeUserIdentity } from "../model/user-invitations-page-helper";

import styles from "./new-user-page.module.scss";
import { NewUserPageRoot } from "./new-user-page.styles";
import { WelcomeAccessibleTenantsSection } from "./welcome-accessible-tenants-section";
import { WelcomeAccountSection } from "./welcome-account-section";
import { WelcomeCreateTeamSection } from "./welcome-create-team-section";
import { WelcomeDangerZoneSection } from "./welcome-danger-zone-section";
import { WelcomeHero } from "./welcome-hero";
import { WelcomeInvitationsSection } from "./welcome-invitations-section";
import { Modules } from "@/constants/modules";
import { useInvitationLoaderList } from "@/logic/hooks/invitation/use-invitation-loader-list";
import { useAccessibleTenantsLoaderList } from "@/logic/hooks/tenant/use-accessible-tenants-loader-list";
import { useTenantsLoaderList } from "@/logic/hooks/tenant/use-tenants-loader-list";
import { routesPath } from "@/routes/config/routes-path";
import { useGetProfileQuery } from "@/services/api/bonuts-api";

export const NewUserPage: FC = () => {
	const { objects: invitations, isLoading: isInvitationsLoading } = useInvitationLoaderList();
	const { objects: accessibleTenants, isLoading: isAccessibleTenantsLoading } = useAccessibleTenantsLoaderList();
	const { objects: tenants, isLoading: isTenantsLoading } = useTenantsLoaderList();
	const { data: currentProfile, isLoading: isCurrentProfileLoading } = useGetProfileQuery({});
	const [isShowingAllInvitations, setIsShowingAllInvitations] = useState(false);

	useLoader(Modules.AccessibleTenants, isAccessibleTenantsLoading);
	useLoader(Modules.MyInvitations, isInvitationsLoading);
	useLoader(Modules.MyTenants, isTenantsLoading);
	useLoader(Modules.Profile, isCurrentProfileLoading);

	const nextState = getTenantlessUserState(tenants);
	const previewInvitations = useMemo(() => getWelcomeInvitationPreview(invitations), [invitations]);
	const visibleInvitations = isShowingAllInvitations ? invitations : previewInvitations;
	const currentUser = currentProfile?.data?.attributes;
	const userIdentity = getWelcomeUserIdentity(
		{
			email: currentUser?.email,
			firstName: currentUser?.first_name,
			lastName: currentUser?.last_name,
			name: currentUser?.name,
		},
		invitations
	);
	const handleShowAllInvitations = useCallback(() => {
		setIsShowingAllInvitations(true);
	}, []);

	if (nextState === TenantlessUserState.Tenants) {
		return <Navigate to={routesPath[BntRoutes.TenantList]} replace />;
	}

	return (
		<NewUserPageRoot>
			<div className={styles.page}>
				<WelcomeHero userName={userIdentity.name} />
				<WelcomeAccountSection userEmail={userIdentity.email} userInitials={userIdentity.initials} />
				<WelcomeInvitationsSection
					invitations={visibleInvitations}
					totalInvitationsCount={invitations.length}
					isShowingAllInvitations={isShowingAllInvitations}
					isEmptyStateVisible={!present(accessibleTenants)}
					onShowAllInvitations={handleShowAllInvitations}
				/>
				<WelcomeAccessibleTenantsSection tenants={accessibleTenants} />
				<WelcomeCreateTeamSection />
				<WelcomeDangerZoneSection />
			</div>
			<Messenger />
		</NewUserPageRoot>
	);
};
