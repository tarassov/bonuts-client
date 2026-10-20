import { useModal } from "@/shared/lib/modal";

import type { TPost } from "@/types/model/post";

export const useEventUi = (post: TPost) => {
	const { DetailedEvent } = useModal();

	const showDetailedPost = () => {
		DetailedEvent.show({ post });
	};

	return { showDetailedPost };
};
