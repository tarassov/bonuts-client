import type { FC } from "react";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";

import { BntLoader } from "@/shared/ui/loader";

import { BlackBoxHero, BlackBoxNotice, blackBoxTexts, HeroStatTiles, useBlackBoxAccess } from "@/entities/black-box";

import { BlackBoxPageLayout } from "@/widgets/black-box/page-layout";
import { ResponderInbox, useResponderInbox } from "@/widgets/black-box/responder-inbox";

import { useInboxStats } from "../model/use-inbox-stats";

import { AnswersAside } from "./answers-aside";
import { BackToBlackBoxLink } from "./back-to-black-box-link";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const BlackBoxAnswersPage: FC = () => {
	const { t } = useBntTranslate();
	const { isLoading, isEnabled, isResponder } = useBlackBoxAccess();
	const inbox = useResponderInbox();
	const stats = useInboxStats(inbox.counts);

	if (isLoading) return <BntLoader />;
	if (!isEnabled) return <BlackBoxNotice text={t(blackBoxTexts.black_box_unavailable)} />;
	if (!isResponder) return <BlackBoxNotice text={t(blackBoxTexts.responder_only)} />;

	return (
		<BlackBoxPageLayout
			toolbar={<BackToBlackBoxLink />}
			hero={
				<BlackBoxHero
					eyebrowIcon={<AdminPanelSettingsOutlined />}
					eyebrow={t(blackBoxTexts.responder_window)}
					title={t(blackBoxTexts.responder_hero_title)}
					description={t(blackBoxTexts.responder_hero_text)}
					aside={<HeroStatTiles stats={stats} />}
				/>
			}
			main={<ResponderInbox status={inbox.status} onStatusChange={inbox.setStatus} questions={inbox.questions} counts={inbox.counts} />}
			aside={<AnswersAside />}
		/>
	);
};
