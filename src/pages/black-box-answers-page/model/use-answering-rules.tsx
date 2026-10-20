import { CampaignOutlined, EditNoteOutlined, VisibilityOffOutlined } from "@mui/icons-material";

import { blackBoxTexts, InfoRuleTone, type TInfoRule, type TInfoRuleConfig, useInfoRules } from "@/entities/black-box";

enum AnsweringRule {
	DoNotLookForAuthor = "do-not-look-for-author",
	AnswerToThePoint = "answer-to-the-point",
	PublishCommon = "publish-common",
}

const ANSWERING_RULES: Record<AnsweringRule, TInfoRuleConfig> = {
	[AnsweringRule.DoNotLookForAuthor]: {
		icon: <VisibilityOffOutlined />,
		tone: InfoRuleTone.Inverse,
		title: blackBoxTexts.rule_do_not_look_for_author,
		text: blackBoxTexts.rule_do_not_look_for_author_text,
	},
	[AnsweringRule.AnswerToThePoint]: {
		icon: <EditNoteOutlined />,
		tone: InfoRuleTone.Brand,
		title: blackBoxTexts.rule_answer_to_the_point,
		text: blackBoxTexts.rule_answer_to_the_point_text,
	},
	[AnsweringRule.PublishCommon]: {
		icon: <CampaignOutlined />,
		tone: InfoRuleTone.Positive,
		title: blackBoxTexts.rule_publish_common,
		text: blackBoxTexts.rule_publish_common_text,
	},
};

export const useAnsweringRules = (): Array<TInfoRule> => useInfoRules(ANSWERING_RULES);
