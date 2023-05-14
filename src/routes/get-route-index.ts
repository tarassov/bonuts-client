export const getRouteIndex = (route?: TRoute<any>): number => {
	if (!route) return 0;
	return route.index !== undefined ? route.index : 10;
};
