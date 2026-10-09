import type { FC } from "react";
import { useCallback } from "react";

import type { BntRoutes } from "@/shared/config/routes";
import { useBntRoutes } from "@/shared/lib/router";

import { MenuCardStyled } from "./menu-card-styled";

export type TMenuCardProps = {
	route: TRoute<BntRoutes>;
};

export const MenuCard: FC<TMenuCardProps> = ({ route }) => {
	const { navigate } = useBntRoutes();

	const onCardClick = useCallback(() => {
		navigate(route.path);
	}, [route, navigate]);

	return <MenuCardStyled route={route} onCardClick={onCardClick} />;
};
