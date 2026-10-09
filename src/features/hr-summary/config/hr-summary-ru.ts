import hrSummaryTexts from "./hr-summary-texts";

export const hrSummaryRu = {
	translations: {
		[hrSummaryTexts.ai_summary]: "AI-сводка",
		[hrSummaryTexts.hr_summary_intro]: "Запросите сводку по признанию в команде за любой период в пределах последних 12 месяцев. В каждом ответе есть и обзор за 12 месяцев.",
		[hrSummaryTexts.hr_summary_privacy_notice]: "При отправке запроса публичные события ленты, комментарии и имена сотрудников могут передаваться во внешний AI-шлюз.",
		[hrSummaryTexts.hr_summary_period_hint]: "Период в пределах последних 12 месяцев",
		[hrSummaryTexts.request_summary]: "Запросить сводку",
		[hrSummaryTexts.summary_request_for_period]: "Сводка за {{from}} – {{to}}",
		[hrSummaryTexts.queued_for_generation]: "Запрос в очереди, генерация скоро начнётся",
		[hrSummaryTexts.preparing_summary]: "Готовлю сводку, это может занять несколько минут",
		[hrSummaryTexts.preparing_summary_elapsed]: "Готовлю сводку, уже {{minutes}} мин",
		[hrSummaryTexts.summary_stuck]: "Похоже, генерация зависла. Запросите сводку заново",
		[hrSummaryTexts.request_again]: "Запросить заново",
		[hrSummaryTexts.summary_failed]: "Не удалось подготовить сводку",
		[hrSummaryTexts.show_annual_overview]: "Показать обзор за 12 месяцев",
		[hrSummaryTexts.hide_annual_overview]: "Скрыть обзор за 12 месяцев",
		[hrSummaryTexts.no_summaries_yet]: "Сводок пока нет",
	},
};
