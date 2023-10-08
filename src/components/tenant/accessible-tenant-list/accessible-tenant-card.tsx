import { FC } from "react";
import { TenantCard } from "components/tenant/tenant-card/tenat-card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_j } from "services/localization/texts";
import { useTenant } from "logic/hooks/tenant/use-tenant";
import { TTenant } from "@/types/model/tenant";

export const AccessibleTenantCard: FC<{ tenant: TTenant }> = ({ tenant }) => {
	const { t } = useBntTranslate();
	const { joinTenant } = useTenant(tenant);
	return (
		<TenantCard
			tenant={tenant}
			submitActionName={t(texts_j.join, { capitalize: true })}
			onSubmitActionClick={joinTenant}
		/>
	);
};
