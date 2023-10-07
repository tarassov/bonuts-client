import { FC } from "react";
import { AccessibleTenantList } from "components/tenant/accessible-tenant-list/accessible-tenant-list";
import { UserTenantsList } from "components/tenant/user-tenant-list/user-tenants-list";

export const TenantsListPage: FC = () => {
	return (
		<>
			<AccessibleTenantList />
			<UserTenantsList />
		</>
	);
};
