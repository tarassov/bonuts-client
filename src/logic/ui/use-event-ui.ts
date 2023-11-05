import { useModal } from "hooks/use-modal";
import { TPost } from "@/types/model/post";

export const useEventUi = (post: TPost) => {
	const { DetailedEvent } = useModal();

	const showDetailedPost = () => {
		DetailedEvent.show({ post });
	};

	return { showDetailedPost };
};
