import { Grid } from "@mui/material";

import { AccessibleTenantCard } from "components/tenant/accessible-tenant-list/accessible-tenant-card";
import { TenantList } from "components/tenant/tenant-list";
import { Modules } from "constants/modules";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_t } from "services/localization/texts";
import { useLoader } from "shared/ui/loader/hooks/use-loader";

import { useAccessibleTenantsLoaderList } from "logic/hooks/tenant/use-accessible-tenants-loader-list";

export const AccessibleTenantList = () => {
	const { objects, isLoading } = useAccessibleTenantsLoaderList();
	const { t } = useBntTranslate();
	useLoader(Modules.AccessibleTenants, isLoading);
	if (!objects?.length) return null;
	return (
		<TenantList title={t(texts_t.teams_you_can_join, { capitalize: true })}>
			{objects.map((tenant) => {
				return (
					<Grid key={tenant.id} item xs={12} sm={12} md={6} lg={3}>
						<AccessibleTenantCard tenant={tenant} />
					</Grid>
				);
			})}
		</TenantList>
	);
};
