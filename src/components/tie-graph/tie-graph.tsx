import { useTiesList } from "logic/hooks/tie/use-ties-list";
import { useEmployeeList } from "logic/hooks/employee/use-employee-list";
import {
	GraphCanvas,
	GraphEdge,
	GraphNode,
	Icon,
	InternalGraphNode,
	useSelection,
	GraphCanvasRef,
} from "reagraph";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { tieTheme } from "components/tie-graph/tie-theme";
import { DatePicker } from "@mui/x-date-pickers";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p } from "services/localization/texts";

export const TieGraph: FC = () => {
	const { objects: profiles = [] } = useEmployeeList();
	const [, setActiveNode] = useState<InternalGraphNode | undefined>();
	const { t } = useBntTranslate();
	const [from, setFrom] = useState<Date | null>(null);
	const [to, setTo] = useState<Date | null>(null);
	const graphRef = useRef<GraphCanvasRef | null>(null);
	const { objects: ties } = useTiesList(from?.toString(), to?.toString());

	const nodes = useMemo<Array<GraphNode>>(() => {
		return profiles
			.filter((x) => x.user_id)
			.map((x) => {
				return {
					id: x.user_id?.toString() || "",
					label: x.name || "",
					icon: x.user_avatar?.thumb?.url || "/assets/icons/default_profile.png",
				};
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
	const { selections, actives, onNodeClick, onCanvasClick } = useSelection({
		ref: graphRef,
		nodes,
		edges,
		pathSelectionType: "all",
	});
	useEffect(() => {
		return () => graphRef.current?.getControls().dispose();
	}, []);

	// setInterval(function() {
	// 	var currentTime = (new Date()).getTime();
	// 	if (currentTime > (lastTime + 2000*2)) {  // ignore small delays
	// 		setTimeout(function() {
	// 			//enter code here, it will run after wake up
	// 		}, 2000);
	// 	}
	// 	lastTime = currentTime;
	// }, 2000);
	return (
		<div className="d-flex  flex-column height-100">
			<div className="p-2 pl-4 pt-4 w-100 d-flex justify-content-evenly">
				<DatePicker
					onChange={(value: Date | null) => setFrom(value)}
					slotProps={{
						textField: {
							variant: "standard",
							placeholder: t(texts_p.period_start, { capitalize: true }),
						},
					}}
				/>
				<DatePicker
					onChange={(value: Date | null) => setTo(value)}
					slotProps={{
						textField: {
							variant: "standard",
							placeholder: t(texts_p.period_end, { capitalize: true }),
						},
					}}
				/>
			</div>
			<div className="flex-grow position-relative">
				{nodes.length > 0 ? (
					<GraphCanvas
						theme={tieTheme}
						layoutType="circular2d"
						ref={graphRef}
						onNodePointerOver={(node) => setActiveNode(node)}
						labelFontUrl="https://fonts.cdnfonts.com/s/56328/l_10646.woff"
						animated
						draggable
						selections={selections}
						actives={actives}
						onCanvasClick={onCanvasClick}
						onNodeClick={onNodeClick}
						nodes={nodes}
						edges={edges}
						edgeInterpolation="curved"
						renderNode={({ node, ...rest }) => {
							return (
								<Icon
									{...rest}
									node={node}
									image={node.icon || "/assets/icons/default_profile.png" || ""}
								/>
							);
						}}
					/>
				) : undefined}
			</div>
		</div>
	);
};
