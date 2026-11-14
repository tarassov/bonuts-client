import { ArrowForwardRounded, PushPinOutlined } from "@mui/icons-material";

import { present } from "@/shared/lib/type-guards";

import { RecognitionAmount, RecognitionHeader } from "./event-recognition-header.styles";
import { EventRecognitionPerson } from "./event-recognition-person";
import { PinnedBadge } from "./pinned-events-strip-styled";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_d, texts_p } from "@/services/localization/texts";
import type { TPost } from "@/types/model/post";
import type { TProfile } from "@/types/model/profile";

export function EventRecognitionHeader({ post, recipient }: { post: TPost; recipient: TProfile }) {
	const { t } = useBntTranslate();
	const operation = post.operation;
	const amount = operation?.amount;

	return (
		<RecognitionHeader data-testid="event-recognition-header">
			{post.pinned ? (
				<PinnedBadge data-testid="event-card-pinned-badge" sx={{ gridColumn: "1 / -1", justifySelf: "start" }}>
					<PushPinOutlined />
					{t(texts_p.pinned, { capitalize: true })}
				</PinnedBadge>
			) : null}
			<EventRecognitionPerson profile={post.profile} />
			<ArrowForwardRounded aria-hidden />
			<EventRecognitionPerson profile={recipient} />
			{present(amount) ? (
				<RecognitionAmount>
					{operation?.direction === 1 ? "+" : ""}
					{amount}
					<span role="img" aria-label={t(texts_d.donut, { count: amount })}>
						🍩
					</span>
				</RecognitionAmount>
			) : null}
		</RecognitionHeader>
	);
}
