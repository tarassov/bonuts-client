import React from "react";
import { useParams } from "react-router-dom";

import { BntStack } from "shared/ui/stack";

import { EventDetailed } from "@/entities/event/ui/event-detailed";

export function EventPage() {
	const { id } = useParams();
	return (
		<BntStack direction="column" className="height-100 width-100" alignItems="center">
			<EventDetailed postId={id} />
		</BntStack>
	);
}
