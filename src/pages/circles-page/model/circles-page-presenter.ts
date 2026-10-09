import type { TCircle } from "@/types/model";

export function getVisibleCircles(circles: Array<TCircle>, query: string) {
	const normalizedQuery = query.trim().toLocaleLowerCase();

	if (!normalizedQuery) return circles;

	return circles.filter((circle) => circle.name?.toLocaleLowerCase().includes(normalizedQuery));
}
