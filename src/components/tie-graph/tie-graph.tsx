import { useTiesList } from "logic/hooks/tie/use-ties-list";
import { useEmployeeList } from "logic/hooks/employee/use-employee-list";
import { GraphCanvas, GraphEdge, GraphNode } from "reagraph";
import React, { FC, useMemo } from "react";

export const TieGraph: FC = () => {
	const { objects: ties } = useTiesList();
	const { objects: profiles = [] } = useEmployeeList();
	const nodes = useMemo<Array<GraphNode>>(() => {
		return profiles
			.filter((x) => x.user_id)
			.map((x) => {
				return { id: x.user_id?.toString() || "", label: x.name || "" };
			});
	}, [profiles]);

	const edges = useMemo<Array<GraphEdge>>(() => {
		return ties
			.filter((x) => x.from_id && x.to_id)
			.map((x) => {
				return {
					id: `${x.from_id}->${x.to_id}`,
					source: x.from_id?.toString() || "",
					target: x.to_id?.toString() || "",
				};
			});
	}, [ties]);
	return (
		<div className="d-flex height-100">
			<div className="flex-grow position-relative">
				{nodes.length > 0 ? (
					<GraphCanvas
						labelFontUrl="/assets/fonts/NotoSansSC-Regular.ttf"
						animated
						draggable
						nodes={nodes}
						edges={edges}
					/>
				) : undefined}
			</div>
		</div>
	);
};
