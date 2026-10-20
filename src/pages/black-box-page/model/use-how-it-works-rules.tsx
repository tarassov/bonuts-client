import { CampaignOutlined, LinkOutlined, NotificationsNoneOutlined, VisibilityOffOutlined } from "@mui/icons-material";

import { blackBoxTexts, InfoRuleTone, type TInfoRule, type TInfoRuleConfig, useInfoRules } from "@/entities/black-box";

enum HowItWorksRule {
	NameNotStored = "name-not-stored",
	StatusLink = "status-link",
	Bell = "bell",
	PublishedWithAnswer = "published-with-answer",
}

const HOW_IT_WORKS_RULES: Record<HowItWorksRule, TInfoRuleConfig> = {
	[HowItWorksRule.NameNotStored]: {
		icon: <VisibilityOffOutlined />,
		tone: InfoRuleTone.Inverse,
		title: blackBoxTexts.rule_name_not_stored,
		text: blackBoxTexts.rule_name_not_stored_text,
	},
	[HowItWorksRule.StatusLink]: {
		icon: <LinkOutlined />,
		tone: InfoRuleTone.Brand,
		title: blackBoxTexts.rule_link_only,
		text: blackBoxTexts.rule_link_only_text,
	},
	[HowItWorksRule.Bell]: {
		icon: <NotificationsNoneOutlined />,
		tone: InfoRuleTone.Brand,
		title: blackBoxTexts.rule_bell,
		text: blackBoxTexts.rule_bell_text,
	},
	[HowItWorksRule.PublishedWithAnswer]: {
		icon: <CampaignOutlined />,
		tone: InfoRuleTone.Positive,
		title: blackBoxTexts.rule_published_with_answer,
		text: blackBoxTexts.rule_published_with_answer_text,
	},
};

export const useHowItWorksRules = (): Array<TInfoRule> => useInfoRules(HOW_IT_WORKS_RULES);
