import type { FC } from "react";
import { VisibilityOffOutlined } from "@mui/icons-material";

import { BntLoader } from "@/shared/ui/loader";

import {
	BlackBoxHero,
	BlackBoxNotice,
	blackBoxTexts,
	HeroStatsInline,
	useBlackBoxAccess,
	useBlackBoxTenant,
	useGetBlackBoxQuestionsQuery,
	useGetBlackBoxRespondersQuery,
	useMarkBlackBoxSeen,
} from "@/entities/black-box";

import { AskQuestionForm } from "@/features/black-box/ask-question";

import { BlackBoxPageLayout } from "@/widgets/black-box/page-layout";
import { PublishedFeed } from "@/widgets/black-box/published-feed";

import { BlackBoxAside } from "./black-box-aside";
import { NoRespondersPanel } from "./no-responders-panel";
import { ResponderWindowLink } from "./responder-window-link";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const BlackBoxPage: FC = () => {
	const { t } = useBntTranslate();
	const tenant = useBlackBoxTenant();
	const { isLoading, isEnabled, isResponder, hasResponders } = useBlackBoxAccess();
	const { data: publishedData } = useGetBlackBoxQuestionsQuery({ tenant }, { skip: !tenant || !isEnabled });
	const { data: respondersData } = useGetBlackBoxRespondersQuery({ tenant }, { skip: !tenant || !isEnabled });
	useMarkBlackBoxSeen(isEnabled);

	if (isLoading) return <BntLoader />;
	if (!isEnabled) return <BlackBoxNotice text={t(blackBoxTexts.black_box_unavailable)} />;

	const published = publishedData?.data ?? [];
	const responders = respondersData?.data ?? [];
	const stats = [
		{ key: "responders", value: responders.length, label: t(blackBoxTexts.responders_count) },
		{ key: "published", value: published.length, label: t(blackBoxTexts.published_answers_count), isHighlighted: true },
	];

	return (
		<BlackBoxPageLayout
			toolbar={isResponder ? <ResponderWindowLink /> : null}
			hero={
				<BlackBoxHero
					eyebrowIcon={<VisibilityOffOutlined />}
					eyebrow={t(blackBoxTexts.fully_anonymous)}
					title={t(blackBoxTexts.black_box)}
					description={t(blackBoxTexts.hero_description)}
					footer={<HeroStatsInline stats={stats} />}
					aside={hasResponders ? <AskQuestionForm /> : <NoRespondersPanel />}
				/>
			}
			main={<PublishedFeed questions={published} />}
			aside={<BlackBoxAside responders={responders} />}
		/>
	);
};
