import { BlackBoxQuestionStatus, blackBoxTexts } from "@/entities/black-box";

type TInboxTabMeta = { label: blackBoxTexts; empty: blackBoxTexts };

export const INBOX_TABS: Record<BlackBoxQuestionStatus, TInboxTabMeta> = {
	[BlackBoxQuestionStatus.Pending]: { label: blackBoxTexts.tab_pending, empty: blackBoxTexts.empty_pending },
	[BlackBoxQuestionStatus.Published]: { label: blackBoxTexts.tab_published, empty: blackBoxTexts.empty_published },
};

export const INBOX_TAB_ORDER = [BlackBoxQuestionStatus.Pending, BlackBoxQuestionStatus.Published];
