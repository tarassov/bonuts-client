import { FC } from "react";
import { TenantCard } from "components/tenant/tenant-card/tenat-card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_g } from "services/localization/texts";
import { useAuth } from "logic/hooks/auth/use-auth";
import { TTenant } from "@/types/model/tenant";

export const UserTenantCard: FC<{ tenant: TTenant }> = ({ tenant }) => {
	const { t } = useBntTranslate();
	const { auth, setTenant } = useAuth();

	return (
		<TenantCard
			tenant={tenant}
			actionName={auth.tenant !== tenant.name ? t(texts_g.go_to) : undefined}
			onActionClick={() => setTenant(tenant.name)}
		/>
	);
};
