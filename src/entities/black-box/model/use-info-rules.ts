import type { TInfoRule, TInfoRuleConfig } from "./info-rule.types";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

/** Turns a rules table keyed by an enum into translated rules, in the order of the table. */
export const useInfoRules = <TKey extends string>(rules: Record<TKey, TInfoRuleConfig>): Array<TInfoRule> => {
	const { t } = useBntTranslate();
	const entries = Object.entries(rules) as Array<[TKey, TInfoRuleConfig]>;

	return entries.map(([key, rule]) => ({ ...rule, key, title: t(rule.title), text: t(rule.text) }));
};
