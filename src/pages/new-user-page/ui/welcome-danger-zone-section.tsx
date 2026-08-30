import type { FC } from "react";
import { memo } from "react";
import { DeleteOutline } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";
import { DashboardSection, DashboardSectionMedia, DashboardSectionVariant } from "@/shared/ui/dashboard-section";

import styles from "./new-user-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_d } from "@/services/localization/texts";

const WelcomeDangerZoneSectionComponent: FC = () => {
	const { t } = useBntTranslate();

	return (
		<DashboardSection
			action={
				<BntButton className={styles.dangerButton} color="error" disabled noTransform variant="outlined">
					{t(texts_d.delete_account, { capitalize: true })}
				</BntButton>
			}
			media={
				<DashboardSectionMedia variant={DashboardSectionVariant.Danger}>
					<DeleteOutline />
				</DashboardSectionMedia>
			}
			variant={DashboardSectionVariant.Danger}
		>
			<div className={styles.main}>
				<div className={styles.sectionTitleRow}>
					<h2 className={styles.sectionTitle}>{t(texts_d.danger_zone, { capitalize: true })}</h2>
					<span className={styles.comingSoonBadge}>{t(texts_c.coming_soon, { capitalize: true })}</span>
				</div>
				<p className={styles.descriptionSmall}>{t(texts_d.delete_account_coming_soon_description)}</p>
			</div>
		</DashboardSection>
	);
};

export const WelcomeDangerZoneSection = memo(WelcomeDangerZoneSectionComponent);
