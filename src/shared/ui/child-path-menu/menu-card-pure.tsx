import type { FC } from "react";

import classNames from "classnames";

import type { BntRoutes } from "@/shared/config/routes";
import { BntCard, BntCardActionArea, BntCardBody } from "@/shared/ui/card";
import { BntTypography } from "@/shared/ui/typography";

import { MENU_CARD_CLASSES } from "./classes";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export type TMenuCardPureProps = {
	route: TRoute<BntRoutes>;
	onCardClick: VoidFunction;
	className?: string;
};

const classes = MENU_CARD_CLASSES;

export const MenuCardPure: FC<TMenuCardPureProps> = ({ route, onCardClick, className }) => {
	const { t } = useBntTranslate();

	return (
		<BntCard raised className={classNames(classes.menuCard, className)}>
			<BntCardActionArea onClick={onCardClick} className={classes.actionArea}>
				<BntCardBody className={classes.cardBody}>
					<div className={classes.cardHeader}>{route.icon}</div>
					<BntTypography className={classes.cardTitle}>{t(route.navbarName)}</BntTypography>
				</BntCardBody>
			</BntCardActionArea>
		</BntCard>
	);
};
