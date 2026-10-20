import { ExpandMore, PushPinOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import classNames from "classnames";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p } from "services/localization/texts";

import { useFormattedDate } from "@/shared/lib/date";
import { BntBox } from "@/shared/ui/box";

import { PINNED_STRIP_CLASSES, PinnedStripBody, PinnedStripRoot } from "./pinned-events-strip-styled";
import type { TPost } from "@/types/model/post";

type TPinnedEventsStripCollapsedProps = {
	posts: Array<TPost>;
	index: number;
	label: string;
	onToggle: VoidFunction;
};

export function PinnedEventsStripCollapsed({ posts, index, label, onToggle }: TPinnedEventsStripCollapsedProps) {
	const { translate } = useBntTranslate();
	const { getFormattedDate } = useFormattedDate();
	const current = posts[index];
	const hasMany = posts.length > 1;
	const ariaLabel = translate(texts_p.pinned, { capitalize: true });

	return (
		<PinnedStripRoot>
			<PinnedStripBody onClick={onToggle} aria-expanded={false} aria-label={ariaLabel} data-testid="pinned-events-strip-body">
				{hasMany ? (
					<BntBox className={PINNED_STRIP_CLASSES.dots} aria-hidden>
						{posts.map((post, dotIndex) => (
							<span key={post.id} className={classNames(PINNED_STRIP_CLASSES.dot, { [PINNED_STRIP_CLASSES.dotActive]: dotIndex === index })} />
						))}
					</BntBox>
				) : null}
				<BntBox className={PINNED_STRIP_CLASSES.body}>
					<span className={PINNED_STRIP_CLASSES.label}>
						<PushPinOutlined />
						{label}
					</span>
					<span className={PINNED_STRIP_CLASSES.preview}>
						<span className={PINNED_STRIP_CLASSES.author}>{current.profile.user_name}</span>
						{" — "}
						{current.content}
					</span>
					<span className={PINNED_STRIP_CLASSES.date}>{getFormattedDate(current.date_string_utc, { day: "2-digit", month: "long" })}</span>
				</BntBox>
			</PinnedStripBody>
			<IconButton className={PINNED_STRIP_CLASSES.toggle} onClick={onToggle} aria-label={ariaLabel} tabIndex={-1}>
				<ExpandMore />
			</IconButton>
		</PinnedStripRoot>
	);
}
