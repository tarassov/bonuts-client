import { FC } from "react";
import { TenantCard } from "components/tenant/tenant-card/tenant-card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_b, texts_g } from "services/localization/texts";
import { useAuth } from "shared/model/auth/use-auth";
import { TTenant } from "@/types/model/tenant";

export const UserTenantCard: FC<{ tenant: TTenant }> = ({ tenant }) => {
	const { t } = useBntTranslate();
	const { auth, setTenant } = useAuth();

	return (
		<TenantCard
			tenant={tenant}
			submitActionName={
				auth.tenant !== tenant.name && !tenant.deactivated ? t(texts_g.go_to, { capitalize: true }) : undefined
			}
			errorText={tenant.deactivated ? t(texts_b.blocked, { capitalize: true }) : undefined}
			onSubmitActionClick={() => setTenant(tenant.name)}
		/>
	);
};
