import type { FC } from "react";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import type { TInfoRule } from "../model/info-rule.types";

import { RuleIcon } from "./info-rule-list.styles";

type TInfoRuleListProps = {
	rules: Array<TInfoRule>;
};

/** Icon, title and one sentence per rule: "how it works" for employees, "answering rules" for responders. */
export const InfoRuleList: FC<TInfoRuleListProps> = ({ rules }) => (
	<BntStack direction="column" gap={1.75}>
		{rules.map((rule) => (
			<BntStack key={rule.key} direction="row" alignItems="flex-start" gap={1.5}>
				<RuleIcon tone={rule.tone}>{rule.icon}</RuleIcon>
				<BntStack direction="column" gap={0.25}>
					<BntTypography variant="subtitle2" fontWeight={700}>
						{rule.title}
					</BntTypography>
					<BntTypography variant="body2" color="text.secondary">
						{rule.text}
					</BntTypography>
				</BntStack>
			</BntStack>
		))}
	</BntStack>
);
