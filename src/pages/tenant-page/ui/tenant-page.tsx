import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { BntSectionHeader } from "@/shared/ui/section";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";
import { BntTypography } from "@/shared/ui/typography";

import styles from "./tenant-page.module.scss";
import { TenantSettingsForm } from "./tenant-settings-form";
import { CommonStrings } from "@/constants/dictionary";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_t } from "@/services/localization/texts";

export function TenantPage() {
	const { routes } = useBntRoutes();
	const { t } = useBntTranslate();
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{
			key: "settings",
			link: routes[BntRoutes.Settings]?.path,
			label: routes[BntRoutes.Settings]?.navbarName || "settings",
			icon: routes[BntRoutes.Settings]?.icon,
		},
		{
			key: routes[BntRoutes.Settings]?.children?.Tenant?.path || "tenant",
			label: routes[BntRoutes.Settings]?.children?.Tenant?.navbarName || CommonStrings.EMPTY_STRING,
			icon: routes[BntRoutes.Settings]?.children?.Tenant?.icon,
		},
	];

	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<div className="flex-grow scroll">
				<main className={styles.page} data-testid="team-settings-page">
					<BntSectionHeader className={styles.pageHeader}>
						<BntTypography as="h1" className={styles.pageTitle}>
							{t(texts_t.team_settings_title)}
						</BntTypography>
						<BntTypography as="p" color="text.secondary">
							{t(texts_t.team_settings_description)}
						</BntTypography>
					</BntSectionHeader>
					<TenantSettingsForm />
				</main>
			</div>
		</BntStack>
	);
}
