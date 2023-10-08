import { FC } from "react";
import { AccessibleTenantList } from "components/tenant/accessible-tenant-list/accessible-tenant-list";
import { UserTenantsList } from "components/tenant/user-tenant-list/user-tenants-list";
import { UserInvitationsList } from "components/invitation/user-invitations-list";

export const TenantsListPage: FC = () => {
	return (
		<>
			<UserInvitationsList />
			<AccessibleTenantList />
			<UserTenantsList />
		</>
	);
};
