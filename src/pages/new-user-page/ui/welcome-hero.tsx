import type { FC } from "react";
import { memo } from "react";

import styles from "./new-user-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_w } from "@/services/localization/texts";

interface IWelcomeHeroProps {
	userName: string;
}

const WelcomeHeroComponent: FC<IWelcomeHeroProps> = ({ userName }) => {
	const { t } = useBntTranslate();

	return (
		<header className={styles.hero}>
			<h1 className={styles.title}>
				{t(texts_w.welcome_user, { capitalize: true })}, {userName}!
			</h1>
			<p className={styles.description}>{t(texts_w.welcome_page_description)}</p>
		</header>
	);
};

export const WelcomeHero = memo(WelcomeHeroComponent);
