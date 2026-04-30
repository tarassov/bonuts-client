import type { FC } from "react";

import { CreateInvitationForm } from "./create-invitation-form";
import { InvitationHowItWorks } from "./invitation-how-it-works";
import styles from "./invitation-page.module.scss";
import { RecentInvitations } from "./recent-invitations";

export const InvitationPage: FC = () => {
	return (
		<main className={styles.page}>
			<div className={styles.layout}>
				<CreateInvitationForm />
				<aside className={styles.sideColumn}>
					<InvitationHowItWorks />
					<RecentInvitations />
				</aside>
			</div>
		</main>
	);
};
