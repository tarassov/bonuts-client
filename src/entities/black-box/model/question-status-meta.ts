import blackBoxTexts from "../config/black-box-texts";

import { BlackBoxQuestionStatus } from "./black-box.types";

export type TQuestionStatusTone = "neutral" | "success";

type TQuestionStatusMeta = { label: blackBoxTexts; tone: TQuestionStatusTone };

/** Pending is neutral, an answered (published) question is a positive outcome. */
export const QUESTION_STATUS_META: Record<BlackBoxQuestionStatus, TQuestionStatusMeta> = {
	[BlackBoxQuestionStatus.Pending]: { label: blackBoxTexts.status_pending, tone: "neutral" },
	[BlackBoxQuestionStatus.Published]: { label: blackBoxTexts.status_published, tone: "success" },
};
