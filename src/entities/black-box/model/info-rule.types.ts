import type { ReactNode } from "react";

import type blackBoxTexts from "../config/black-box-texts";

/** The icon circle of a rule: the dark "box" surface, the brand tint or the positive tint. */
export enum InfoRuleTone {
	Inverse = "inverse",
	Brand = "brand",
	Positive = "positive",
}

/** How a rule is declared in a lookup table: the texts are i18n keys. */
export type TInfoRuleConfig = {
	icon: ReactNode;
	tone: InfoRuleTone;
	title: blackBoxTexts;
	text: blackBoxTexts;
};

/** A rule ready to render, with translated texts. */
export type TInfoRule = Omit<TInfoRuleConfig, "title" | "text"> & {
	key: string;
	title: string;
	text: string;
};
