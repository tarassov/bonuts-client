import { useInvitationLoaderList } from "logic/hooks/invitation/use-invitation-loader-list";
import { useAccessibleTenantsLoaderList } from "logic/hooks/tenant/use-accessible-tenants-loader-list";
import { useTenantsLoaderList } from "logic/hooks/tenant/use-tenants-loader-list";

export const NoTenantsFallback = () => {
	const { objects: invitations, isLoading: isLoadingInvitations } = useInvitationLoaderList();
	const { objects: accessible, isLoading: isLoadingAccessible } = useAccessibleTenantsLoaderList();
	const { objects: userTenants, isLoading: isLoadingTenants } = useTenantsLoaderList();
	if (
		!isLoadingTenants &&
		!isLoadingAccessible &&
		!isLoadingInvitations &&
		!invitations?.length &&
		!accessible?.length &&
		!userTenants?.length
	) {
		return <div />;
	}
	return null;
};
