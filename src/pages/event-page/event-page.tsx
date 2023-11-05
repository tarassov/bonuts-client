import { BntStack } from "shared/stack/stack";

import React from "react";
import { EventDetailed } from "components/event/event-card/event-detailed";
import { useParams } from "react-router-dom";

export const EventPage = () => {
	const { id } = useParams();
	return (
		<BntStack direction="column" className="height-100 width-100" alignItems="center">
			<EventDetailed postId={id} />
		</BntStack>
	);
};
