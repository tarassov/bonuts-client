import type { FC } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { BntRegularButton } from "@/shared/ui/buttons";
import { BntTypography } from "@/shared/ui/typography";

import hrSummaryTexts from "../config/hr-summary-texts";
import type { THrSummaryPeriod } from "../model/hr-summary.types";
import { getDefaultPeriod, getEarliestPeriodStart, isPeriodValid } from "../model/hr-summary-helper";

import styles from "./hr-summary-chat.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_p } from "@/services/localization/texts";

interface IHrSummaryComposerProps {
	isBusy: boolean;
	onSubmit: (period: THrSummaryPeriod) => void;
}

export const HrSummaryComposer: FC<IHrSummaryComposerProps> = ({ isBusy, onSubmit }) => {
	const { t } = useBntTranslate();
	const [period, setPeriod] = useState<THrSummaryPeriod>(() => getDefaultPeriod());

	const today = new Date();
	const earliest = getEarliestPeriodStart(today);
	const canSubmit = !isBusy && isPeriodValid(period, today);

	const handleFromChange = (value: Date | null) => {
		if (value) setPeriod((current) => ({ ...current, dateFrom: value }));
	};

	const handleToChange = (value: Date | null) => {
		if (value) setPeriod((current) => ({ ...current, dateTo: value }));
	};

	const handleSubmit = () => {
		if (canSubmit) onSubmit(period);
	};

	return (
		<div className={styles.composer}>
			<Alert severity="info" variant="outlined" icon={false}>
				<BntTypography variant="caption">{t(hrSummaryTexts.hr_summary_privacy_notice, { capitalize: true })}</BntTypography>
			</Alert>
			<div className={styles.composerFields}>
				<DatePicker
					value={period.dateFrom}
					minDate={earliest}
					maxDate={period.dateTo}
					onChange={handleFromChange}
					slotProps={{ textField: { variant: "standard", label: t(texts_p.period_start, { capitalize: true }) } }}
				/>
				<DatePicker
					value={period.dateTo}
					minDate={period.dateFrom}
					maxDate={today}
					onChange={handleToChange}
					slotProps={{ textField: { variant: "standard", label: t(texts_p.period_end, { capitalize: true }) } }}
				/>
				<BntRegularButton noTransform disabled={!canSubmit} onClick={handleSubmit}>
					{t(hrSummaryTexts.request_summary, { capitalize: true })}
				</BntRegularButton>
			</div>
			<BntTypography variant="caption" color="text.secondary">
				{t(hrSummaryTexts.hr_summary_period_hint, { capitalize: true })}
			</BntTypography>
		</div>
	);
};
