import type { FC } from "react";
import { memo } from "react";
import { ArrowForwardOutlined } from "@mui/icons-material";

import { BntTransparentButton } from "@/shared/ui/buttons";

import styles from "./new-user-page.module.scss";
import { WelcomeInvitationItem } from "./welcome-invitation-item";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_i, texts_m, texts_v } from "@/services/localization/texts";
import type { TInvitation } from "@/types/model/inivtation";

interface IWelcomeInvitationsSectionProps {
	invitations: Array<TInvitation>;
	totalInvitationsCount: number;
	isShowingAllInvitations: boolean;
	onShowAllInvitations: VoidFunction;
}

const WelcomeInvitationsSectionComponent: FC<IWelcomeInvitationsSectionProps> = ({ invitations, totalInvitationsCount, isShowingAllInvitations, onShowAllInvitations }) => {
	const { t } = useBntTranslate();

	return (
		<section className={styles.invitationsCard}>
			<div className={styles.invitationsHeader}>
				<div className={styles.main}>
					<h2 className={styles.sectionTitle}>{t(texts_m.my_invitations, { capitalize: true })}</h2>
					<p className={styles.descriptionSmall}>{t(texts_i.join_teams_from_received_invitations)}</p>
				</div>
				<div className={styles.countPill}>
					<strong>{totalInvitationsCount}</strong>
					<span>{t(texts_i.invitations)}</span>
				</div>
			</div>

			<div className={styles.invitationList}>
				{invitations.map((invitation) => (
					<WelcomeInvitationItem invitation={invitation} key={invitation.id} onView={onShowAllInvitations} />
				))}
				{!invitations.length && <div className={styles.emptyState}>{t(texts_i.no_invitations_received_yet, { capitalize: true })}</div>}
			</div>

			{totalInvitationsCount > 2 && !isShowingAllInvitations && (
				<BntTransparentButton className={styles.linkButton} onClick={onShowAllInvitations}>
					{t(texts_v.view_all_invitations, { capitalize: true })} <ArrowForwardOutlined fontSize="small" />
				</BntTransparentButton>
			)}
		</section>
	);
};

export const WelcomeInvitationsSection = memo(WelcomeInvitationsSectionComponent);
