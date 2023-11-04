import { FC } from "react";
import { TModalProps } from "shared/types/dialog-types";
import { EventDetailed } from "components/event/event-card/event-detailed";
import { TPost } from "@/types/model/post";

export type ModalDetailedEventProps = {
	post: TPost;
};
export const ModalDetailedEvent: FC<ModalDetailedEventProps & TModalProps> = ({ post }) => {
	return <EventDetailed post={post} />;
};
