import { CheckCircleOutline, MailOutline, NearMeOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";

import styles from "./invitation-page.module.scss";
import { texts_h, texts_j, texts_l, texts_s, texts_u } from "@/services/localization/texts";

const steps = [
	{
		icon: <NearMeOutlined />,
		title: texts_s.send_invitation_step_title,
		text: texts_u.user_email_name_step_description,
	},
	{
		icon: <MailOutline />,
		title: texts_u.user_receives_email_step_title,
		text: texts_l.login_link_step_description,
	},
	{
		icon: <CheckCircleOutline />,
		title: texts_j.joins_team_step_title,
		text: texts_u.user_appears_in_employees_step_description,
		isSuccess: true,
	},
];

export function InvitationHowItWorks() {
	const { t } = useBntTranslate();

	return (
		<section className={`${styles.panel} ${styles.sidePanel}`}>
			<h2 className={styles.panelTitle}>{t(texts_h.how_it_works)}</h2>
			<div className={styles.steps}>
				{steps.map((step) => (
					<div className={styles.step} key={step.title}>
						<div className={`${styles.stepIcon} ${step.isSuccess ? styles.stepSuccess : ""}`}>{step.icon}</div>
						<div>
							<p className={styles.stepTitle}>{t(step.title)}</p>
							<p className={styles.stepText}>{t(step.text)}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
