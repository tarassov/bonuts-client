import { FC, useCallback } from "react";

import { MenuCardStyled } from "components/child-path/menu-card/menu-card-styled";
import { BntRoutes } from "shared/config/routes";
import { useBntRoutes } from "shared/lib/router";

export type MenuCardProps = {
	route: TRoute<BntRoutes>;
};

export const MenuCard: FC<MenuCardProps> = ({ route }) => {
	const { navigate } = useBntRoutes();

	const onCardClick = useCallback(() => {
		navigate(route.path);
	}, [route, navigate]);

	return <MenuCardStyled route={route} onCardClick={onCardClick} />;
};
