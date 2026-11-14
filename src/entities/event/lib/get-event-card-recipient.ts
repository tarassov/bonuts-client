import { DealType } from "@/types/model/deal-type";
import type { TPost } from "@/types/model/post";
import type { TProfile } from "@/types/model/profile";

export function getEventCardRecipient(post: TPost): TProfile | undefined {
	const operation = post.operation;
	if (!post.public || !operation) return undefined;
	if (operation.deal_type !== DealType.Share && operation.deal_type !== DealType.Transfer) return undefined;

	if (operation.from_profile && operation.from_profile.id !== post.profile.id) return undefined;

	return operation.to_profile;
}
