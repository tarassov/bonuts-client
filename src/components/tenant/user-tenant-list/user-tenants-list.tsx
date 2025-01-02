import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { Grid } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_m } from "services/localization/texts";
import { TenantList } from "components/tenant/tenant-list";
import { useTenantsLoaderList } from "logic/hooks/tenant/use-tenants-loader-list";
import { UserTenantCard } from "components/tenant/user-tenant-list/user-tenant-card";

export const UserTenantsList = () => {
	const { objects, isLoading } = useTenantsLoaderList();
	const { t } = useBntTranslate();
	useLoader(Modules.MyTenants, isLoading);
	if (!objects?.length) return null;
	return (
		<TenantList title={t(texts_m.my_teams, { capitalize: true })}>
			{objects.map((tenant) => {
				return (
					<Grid key={tenant.id} item xs={12} sm={12} md={6} lg={3}>
						<UserTenantCard tenant={tenant} />
					</Grid>
				);
			})}
		</TenantList>
	);
};
