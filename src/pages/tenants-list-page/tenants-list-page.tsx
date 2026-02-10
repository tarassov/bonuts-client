import { FC } from "react";

import { UserInvitationsList } from "components/invitation/user-invitations-list";
import { AccessibleTenantList } from "components/tenant/accessible-tenant-list/accessible-tenant-list";
import { UserTenantsList } from "components/tenant/user-tenant-list/user-tenants-list";

import { Messenger } from "@/features/3cx/messenger";

export const TenantsListPage: FC = () => {
	return (
		<>
			<UserInvitationsList />
			<AccessibleTenantList />
			<UserTenantsList />
			<Messenger />
		</>
	);
};
