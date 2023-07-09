import { FC } from "react";
import { TCircle } from "@/types/model/circle";

export type CircleListPureProps = {
	circles: Array<TCircle>;
};
export const CircleListPure: FC<CircleListPureProps> = ({ circles }) => {
	return (
		<div>
			{circles.map((circle) => {
				return <span>{circle.name}</span>;
			})}
		</div>
	);
};
