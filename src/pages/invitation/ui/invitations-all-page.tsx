import { InvitationEmptyPageRoot, InvitationPanel } from "./invitation-page.styles";
import styles from "./invitations-all-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_i, texts_s } from "@/services/localization/texts";

export function InvitationsAllPage() {
	const { t } = useBntTranslate();

	return (
		<InvitationEmptyPageRoot>
			<InvitationPanel className={styles.emptyCard}>
				<h1 className={styles.panelTitle}>{t(texts_i.invitations, { capitalize: true })}</h1>
				<p className={styles.emptyText}>{t(texts_s.soon_will_be_back)}</p>
			</InvitationPanel>
		</InvitationEmptyPageRoot>
	);
}
