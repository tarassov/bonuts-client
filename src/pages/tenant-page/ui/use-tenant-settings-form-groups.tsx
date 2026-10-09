import type { ReactNode } from "react";
import { AutoAwesomeOutlined, CelebrationOutlined, GroupsOutlined } from "@mui/icons-material";

import type { TFieldGroup } from "@/shared/ui/form";

import styles from "./tenant-settings-form.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_t, texts_w } from "@/services/localization/texts";

const sectionPadding = () => ({ p: { xs: 2, md: 3 } });
const nestedGroupPadding = () => ({ p: 0 });
const nestedFieldsPadding = () => ({ p: 0, pl: { xs: 0, md: 3 } });

export function useTenantSettingsFormGroups(logoEditor: ReactNode) {
	const { t } = useBntTranslate();
	const groups: Array<TFieldGroup> = [
		{
			className: styles.sectionCard,
			description: t(texts_t.team_identity_description),
			gap: 0,
			groups: [
				{ content: logoEditor, id: 11, xs: 12, md: 4, sx: nestedGroupPadding },
				{ id: 12, xs: 12, md: 8, sx: nestedFieldsPadding },
			],
			headerContent: (
				<span aria-hidden="true" className={styles.sectionIcon}>
					<GroupsOutlined />
				</span>
			),
			id: 1,
			sx: sectionPadding,
			title: t(texts_t.team_identity_title),
			xs: 12,
		},
		{
			className: styles.sectionCard,
			description: t(texts_w.welcome_recognition_description),
			headerContent: (
				<span aria-hidden="true" className={styles.sectionIcon}>
					<AutoAwesomeOutlined />
				</span>
			),
			id: 2,
			sx: sectionPadding,
			title: t(texts_w.welcome_recognition_title),
			xs: 12,
		},
		{
			className: `${styles.sectionCard} ${styles.birthdayCard}`,
			description: t(texts_t.team_birthday_description),
			headerContent: (
				<span aria-hidden="true" className={styles.sectionIcon}>
					<CelebrationOutlined />
				</span>
			),
			id: 3,
			sx: sectionPadding,
			title: t(texts_t.team_birthday_title),
			xs: 12,
		},
	];

	return { groups };
}
