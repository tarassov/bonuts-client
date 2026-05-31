import type { FC } from "react";
import { memo } from "react";
import { CheckCircleOutlined, EmailOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";
import { DashboardSection, DashboardSectionMedia } from "@/shared/ui/dashboard-section";

import styles from "./new-user-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_e, texts_y } from "@/services/localization/texts";

interface IWelcomeAccountSectionProps {
	userEmail: string;
	userInitials: string;
}

const WelcomeAccountSectionComponent: FC<IWelcomeAccountSectionProps> = ({ userEmail, userInitials }) => {
	const { t } = useBntTranslate();

	return (
		<DashboardSection
			action={
				<BntButton className={styles.disabledButton} disabled noTransform startIcon={<EmailOutlined />} variant="outlined">
					{t(texts_c.change_email, { capitalize: true })}
				</BntButton>
			}
			media={<DashboardSectionMedia>{userInitials}</DashboardSectionMedia>}
		>
			<div className={styles.main}>
				<h2 className={styles.sectionTitle}>{t(texts_y.your_account, { capitalize: true })}</h2>
				<p className={styles.label}>{t(texts_e.email_address, { capitalize: true })}</p>
				<div className={styles.emailRow}>
					<p className={styles.email}>{userEmail}</p>
					<span className={styles.badge}>
						<CheckCircleOutlined />
						{t(texts_c.confirmed, { capitalize: true })}
					</span>
				</div>
				<p className={styles.descriptionSmall}>{t(texts_e.email_is_used_for_sign_in_and_notifications)}</p>
			</div>
		</DashboardSection>
	);
};

export const WelcomeAccountSection = memo(WelcomeAccountSectionComponent);
