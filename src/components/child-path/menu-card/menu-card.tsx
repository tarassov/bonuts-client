import { FC, useCallback } from "react";
import { MenuCardStyled } from "components/child-path/menu-card/menu-card-styled";
import { useBntRoutes } from "hooks/use-bnt-routes";

export type MenuCardProps = {
	route: TRoute;
};

export const MenuCard: FC<MenuCardProps> = ({ route }) => {
	const { navigate } = useBntRoutes();

	const onCardClick = useCallback(() => {
		navigate(route.path);
	}, [route, navigate]);

	return <MenuCardStyled route={route} onCardClick={onCardClick} />;
};
