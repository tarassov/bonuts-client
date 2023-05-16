import { BntCard } from "shared/card/card";
import { BntCardActionArea } from "shared/card/card-action-area";
import { FC } from "react";
import { MENU_CARD_CLASSES } from "components/child-path/menu-card/classes";
import classNames from "classnames";
import { BntCardBody } from "shared/card/card-body";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTypography } from "shared/typography/typography";
import { BntRoutes } from "routes/config/routes";

export type MenuCardPureProps = {
	route: TRoute<BntRoutes>;
	onCardClick: VoidFunction;
	className?: string;
};

const classes = MENU_CARD_CLASSES;
export const MenuCardPure: FC<MenuCardPureProps> = ({ route, onCardClick, className }) => {
	const { t } = useBntTranslate();
	return (
		<BntCard raised color="primaryLight" className={classNames(classes.menuCard, className)}>
			<BntCardActionArea onClick={onCardClick} className={classes.actionArea}>
				<BntCardBody className={classes.cardBody}>
					<div className={classes.cardHeader}>{route.icon}</div>
					<BntTypography className={classes.cardTitle}>{t(route.navbarName)}</BntTypography>
				</BntCardBody>
			</BntCardActionArea>
		</BntCard>
	);
};
