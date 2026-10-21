import type { FC } from "react";

import { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";
import { BntBreadcrumbs } from "@/shared/ui/breadcrumb";
import { BntSectionHeader } from "@/shared/ui/section";
import { BntStack } from "@/shared/ui/stack";
import type { TBntBreadcrumbItem } from "@/shared/ui/types";
import { BntTypography } from "@/shared/ui/typography";

import { BlackBoxNotice, blackBoxTexts, useBlackBoxAccess } from "@/entities/black-box";

import { RespondersPicker } from "@/features/black-box/pick-responders";

import styles from "./black-box-settings-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const BlackBoxSettingsPage: FC = () => {
	const { t } = useBntTranslate();
	const { routes } = useBntRoutes();
	const { isEnabled } = useBlackBoxAccess();
	const settingsRoute = routes[BntRoutes.Settings];
	const breadcrumbs: Array<TBntBreadcrumbItem> = [
		{ key: "settings", link: settingsRoute?.path, label: settingsRoute?.navbarName || "settings", icon: settingsRoute?.icon },
		{ key: "black-box", label: t(blackBoxTexts.settings_title), icon: settingsRoute?.children?.BlackBoxSettings?.icon },
	];

	return (
		<BntStack direction="column" sx={{ height: "100%", overflow: "hidden" }}>
			<BntBreadcrumbs items={breadcrumbs} />
			<div className="flex-grow scroll">
				<main className={styles.page}>
					<BntSectionHeader className={styles.pageHeader}>
						<BntTypography as="h1" className={styles.pageTitle}>
							{t(blackBoxTexts.settings_title)}
						</BntTypography>
						<BntTypography as="p" color="text.secondary">
							{t(blackBoxTexts.settings_description)}
						</BntTypography>
					</BntSectionHeader>
					{isEnabled ? <RespondersPicker /> : <BlackBoxNotice text={t(blackBoxTexts.black_box_unavailable)} />}
				</main>
			</div>
		</BntStack>
	);
};
