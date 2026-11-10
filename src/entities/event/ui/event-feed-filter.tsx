import type { MouseEvent } from "react";
import { startTransition, useOptimistic } from "react";

import { FeedFilter, FeedFilterOption } from "./event-feed-filter.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_a, texts_i } from "@/services/localization/texts";

type TEventFeedFilterProps = {
	showMine: boolean;
	onShowMineChange: (isMine: boolean) => void;
};

export function EventFeedFilter({ showMine, onShowMineChange }: TEventFeedFilterProps) {
	const { translate } = useBntTranslate();
	const [isMineSelected, setOptimisticSelection] = useOptimistic(showMine);
	const handleChange = (_event: MouseEvent<HTMLElement>, value: boolean | null) => {
		if (value === null || value === isMineSelected) return;

		startTransition(() => {
			setOptimisticSelection(value);
			onShowMineChange(value);
		});
	};

	return (
		<FeedFilter data-show-mine={isMineSelected} exclusive value={isMineSelected} onChange={handleChange}>
			<FeedFilterOption value={false}>{translate(texts_a.all_posts)}</FeedFilterOption>
			<FeedFilterOption value={true}>{translate(texts_i.involving_me)}</FeedFilterOption>
		</FeedFilter>
	);
}
