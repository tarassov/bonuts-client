import type { FC, ReactNode } from "react";

import styles from "./black-box-page-layout.module.scss";

type TBlackBoxPageLayoutProps = {
	toolbar?: ReactNode;
	hero: ReactNode;
	main: ReactNode;
	aside: ReactNode;
};

/** Hero on top, the main column and the aside next to it; on phones the aside goes under the main column. */
export const BlackBoxPageLayout: FC<TBlackBoxPageLayoutProps> = ({ toolbar, hero, main, aside }) => (
	<div className="flex-grow scroll">
		<main className={styles.page}>
			{toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}
			{hero}
			<div className={styles.columns}>
				<div className={styles.main}>{main}</div>
				<aside className={styles.aside}>{aside}</aside>
			</div>
		</main>
	</div>
);
