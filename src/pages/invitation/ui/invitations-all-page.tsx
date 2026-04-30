import { useBntTranslate } from "hooks/use-bnt-translate";

import styles from "./invitation-page.module.scss";
import { texts_i, texts_s } from "@/services/localization/texts";

export function InvitationsAllPage() {
	const { t } = useBntTranslate();

	return (
		<div className={styles.emptyPage}>
			<section className={`${styles.panel} ${styles.emptyCard}`}>
				<h1 className={styles.panelTitle}>{t(texts_i.invitations, { capitalize: true })}</h1>
				<p className={styles.emptyText}>{t(texts_s.soon_will_be_back)}</p>
			</section>
		</div>
	);
}
