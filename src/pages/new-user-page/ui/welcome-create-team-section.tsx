import type { FC } from "react";
import { memo } from "react";
import { AddOutlined } from "@mui/icons-material";

import { BntRegularButton } from "@/shared/ui/buttons";
import { DashboardSection, DashboardSectionMedia, DashboardSectionVariant } from "@/shared/ui/dashboard-section";

import styles from "./new-user-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c } from "@/services/localization/texts";

const WelcomeCreateTeamSectionComponent: FC = () => {
	const { t } = useBntTranslate();

	return (
		<DashboardSection
			action={
				<BntRegularButton className={styles.actionButton} noTransform onClick={() => undefined} variant="contained">
					{t(texts_c.create_your_team, { capitalize: true })}
				</BntRegularButton>
			}
			media={
				<DashboardSectionMedia variant={DashboardSectionVariant.Warm}>
					<AddOutlined />
				</DashboardSectionMedia>
			}
			variant={DashboardSectionVariant.Warm}
		>
			<div className={styles.main}>
				<h2 className={styles.sectionTitle}>{t(texts_c.create_your_team, { capitalize: true })}</h2>
				<p className={styles.descriptionSmall}>{t(texts_c.create_team_mock_description)}</p>
			</div>
		</DashboardSection>
	);
};

export const WelcomeCreateTeamSection = memo(WelcomeCreateTeamSectionComponent);
