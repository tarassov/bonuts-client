import type { FC } from "react";

import { BntLoader } from "@/shared/ui/loader";
import { BntTypography } from "@/shared/ui/typography";

import { BlackBoxNotice, blackBoxTexts, QuestionCard, useMarkBlackBoxSeen } from "@/entities/black-box";

import { useQuestionByLink } from "../model/use-question-by-link";

import styles from "./black-box-question-page.module.scss";
import { QuestionAnswerState } from "./question-answer-state";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

/** The author's private view of their question, opened only through the one-time link. */
export const BlackBoxQuestionPage: FC = () => {
	const { t } = useBntTranslate();
	const { question, isLoading, isNotFound } = useQuestionByLink();
	useMarkBlackBoxSeen(Boolean(question));

	return (
		<div className="flex-grow scroll">
			<main className={styles.page}>
				<BntTypography as="h1" variant="h5" fontWeight={800}>
					{t(blackBoxTexts.question_link_title)}
				</BntTypography>
				{isLoading ? <BntLoader /> : null}
				{isNotFound ? <BlackBoxNotice text={t(blackBoxTexts.question_link_not_found)} /> : null}
				{question ? (
					<QuestionCard question={question}>
						<QuestionAnswerState question={question} />
					</QuestionCard>
				) : null}
			</main>
		</div>
	);
};
