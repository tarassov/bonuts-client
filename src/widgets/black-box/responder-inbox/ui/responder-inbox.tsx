import type { FC } from "react";

import { useCurrentProfile } from "@/shared/model/auth";
import { BntStack } from "@/shared/ui/stack";
import { BntSegmentedTabs, type TBntSegmentedTabItem } from "@/shared/ui/tab";

import { BlackBoxQuestionStatus, blackBoxTexts, ChestAnimation, type TBlackBoxInboxCounts, type TBlackBoxQuestion } from "@/entities/black-box";

import { InboxQuestionCard, useAnswerActions, usePublishAnimation } from "@/features/black-box/answer-question";

import { INBOX_TAB_ORDER, INBOX_TABS } from "../model/inbox-tabs";

import { EmptyInbox } from "./responder-inbox.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TResponderInboxProps = {
	status: BlackBoxQuestionStatus;
	onStatusChange: (status: BlackBoxQuestionStatus) => void;
	questions: Array<TBlackBoxQuestion>;
	counts: TBlackBoxInboxCounts;
};

/** The responder's tabs and cards. The opening box lives here, above the list the answered card leaves. */
export const ResponderInbox: FC<TResponderInboxProps> = ({ status, onStatusChange, questions, counts }) => {
	const { t } = useBntTranslate();
	const { profile } = useCurrentProfile();
	const { answer, updateAnswer, isBusy } = useAnswerActions();
	const { publishedText, chestMode, playFor, finish } = usePublishAnimation();

	const tabs: Array<TBntSegmentedTabItem<BlackBoxQuestionStatus>> = INBOX_TAB_ORDER.map((tabStatus) => ({
		value: tabStatus,
		label: t(INBOX_TABS[tabStatus].label),
		count: counts[tabStatus],
	}));

	const handleAnswer = async (id: string, text: string) => {
		const question = await answer(id, text);
		playFor(question);

		return question;
	};

	return (
		<BntStack direction="column" gap={2}>
			<BntSegmentedTabs ariaLabel={t(blackBoxTexts.inbox_tabs)} items={tabs} value={status} onChange={onStatusChange} />
			{questions.length ? null : <EmptyInbox>{t(INBOX_TABS[status].empty)}</EmptyInbox>}
			{questions.map((question) => (
				<InboxQuestionCard key={question.id} question={question} currentProfileId={profile?.id} isBusy={isBusy} onAnswer={handleAnswer} onUpdateAnswer={updateAnswer} />
			))}
			{chestMode && publishedText ? <ChestAnimation mode={chestMode} text={publishedText} onFinish={finish} /> : null}
		</BntStack>
	);
};
