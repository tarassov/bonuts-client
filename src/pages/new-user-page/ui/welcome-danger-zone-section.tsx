import type { FC } from "react";
import { memo } from "react";
import { DeleteOutline } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";
import { DashboardSection, DashboardSectionMedia, DashboardSectionVariant } from "@/shared/ui/dashboard-section";

import styles from "./new-user-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_d } from "@/services/localization/texts";

const WelcomeDangerZoneSectionComponent: FC = () => {
	const { t } = useBntTranslate();

	return (
		<DashboardSection
			action={
				<BntButton className={styles.dangerButton} color="error" noTransform onClick={() => undefined} variant="outlined">
					{t(texts_d.delete_profile, { capitalize: true })}
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
				<h2 className={styles.sectionTitle}>{t(texts_d.danger_zone, { capitalize: true })}</h2>
				<p className={styles.descriptionSmall}>{t(texts_d.delete_profile_mock_description)}</p>
			</div>
		</DashboardSection>
	);
};

export const WelcomeDangerZoneSection = memo(WelcomeDangerZoneSectionComponent);
