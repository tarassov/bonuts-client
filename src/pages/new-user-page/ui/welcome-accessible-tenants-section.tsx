import type { FC } from "react";
import { memo, useCallback } from "react";

import { present } from "@/shared/lib/type-guards";

import { TenantJoinPreviewItem } from "@/entities/tenant";

import { useJoinTenant } from "@/features/tenant-join";

import styles from "./new-user-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_j, texts_t } from "@/services/localization/texts";
import type { TTenant } from "@/types/model/tenant";

interface IWelcomeAccessibleTenantsSectionProps {
	tenants: Array<TTenant>;
}

const WelcomeAccessibleTenantsSectionComponent: FC<IWelcomeAccessibleTenantsSectionProps> = ({ tenants }) => {
	const { t } = useBntTranslate();
	const { joiningTenantId, joinTenant } = useJoinTenant();
	const handleJoin = useCallback((tenant: TTenant) => () => joinTenant(tenant), [joinTenant]);

	if (!present(tenants)) return null;

	return (
		<section className={styles.invitationsCard}>
			<div className={styles.main}>
				<h2 className={styles.sectionTitle}>{t(texts_t.teams_you_can_join, { capitalize: true })}</h2>
				<p className={styles.descriptionSmall}>{t(texts_t.teams_matching_your_work_email)}</p>
			</div>
			<div className={styles.invitationList}>
				{tenants.map((tenant) => (
					<TenantJoinPreviewItem
						actionLabel={t(texts_j.join, { capitalize: true })}
						description={t(texts_j.join_team_with_work_email)}
						isJoining={joiningTenantId !== undefined}
						key={tenant.id}
						onJoin={handleJoin(tenant)}
						tenant={tenant}
					/>
				))}
			</div>
		</section>
	);
};

export const WelcomeAccessibleTenantsSection = memo(WelcomeAccessibleTenantsSectionComponent);
