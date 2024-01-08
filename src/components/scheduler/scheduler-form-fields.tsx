import { BntTextInputElement } from "shared/input/text-input-element";
import { texts_a, texts_c, texts_e, texts_n } from "services/localization/texts";
import { BntTimePickerElement } from "shared/input/time-picker-element";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useFormState, useWatch } from "react-hook-form";
import { BntSelectElement } from "shared/input/select-element";
import { useMemo } from "react";
import { Grid } from "@mui/material";
import { getMonthDayOptions } from "shared/helpers/get-month-day-array";
import { SchedulerTypes } from "components/scheduler/constants/scheduler-types";
import { WeekdayDaySelect } from "shared/form/special-fileds/weekday-day-select";
import { TimezoneSelect } from "shared/form/special-fileds/timezone-select";
import { BntTextAreaInput } from "shared/input/text-area-input";
import { TScheduler } from "@/types/model/scheduler";

export const SchedulerFormFields = () => {
	const { t } = useBntTranslate();
	const { errors } = useFormState<TScheduler>();
	const every = useWatch({ name: "every" });

	const types = useMemo(
		() => [
			{ id: SchedulerTypes.daily, label: t(texts_e.every_month) },
			{ id: SchedulerTypes.weekly, label: t(texts_e.every_week) },
		],
		[]
	);

	return (
		<Grid container>
			<Grid item xs={12} sm={12} lg={8}>
				<BntTextInputElement
					margin="normal"
					fullWidth
					error={!!errors}
					helperText={errors.name?.message}
					required
					name="name"
					label={t(texts_n.name, { capitalize: true })}
					autoFocus
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<BntSelectElement
					fullWidth
					name="every"
					options={types}
					required
					label={t(texts_c.choose_type)}
					placeholder={t(texts_c.choose_type)}
				/>
			</Grid>
			{every === "daily" ? (
				<Grid item xs={12} sm={6}>
					<BntSelectElement
						className="pl-2"
						fullWidth
						name="day"
						options={getMonthDayOptions()}
						label={t(texts_c.choose_day)}
						SelectProps={{
							MenuProps: {
								style: {
									maxHeight: 400,
								},
							},
						}}
					/>
				</Grid>
			) : (
				<Grid item xs={12} sm={5}>
					<WeekdayDaySelect
						fullWidth
						className="pl-2"
						name="weekday"
						options={getMonthDayOptions()}
						label={t(texts_c.choose_day)}
						SelectProps={{
							MenuProps: {
								style: {
									maxHeight: 400,
								},
							},
						}}
					/>
				</Grid>
			)}
			<Grid item xs={12} sm={6} className="mt-2">
				<BntTimePickerElement
					stringLabel={texts_c.choose_time}
					name="execute_time"
					ampm={false}
					format="HH:mm"
					required
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={6} className="mt-2">
				<TimezoneSelect
					className="pl-2"
					name="timezoneValue"
					fullWidth
					stringLabel={texts_c.choose_timezone}
				/>
			</Grid>
			<Grid item xs={12}>
				<BntTextInputElement
					margin="normal"
					fullWidth
					error={!!errors}
					helperText={errors.amount?.message}
					required
					name="amount"
					stringLabel={texts_a.amount}
					type="number"
				/>
			</Grid>
			<Grid item xs={12} className="mt-2">
				<BntTextAreaInput
					name="comment"
					required
					fullWidth
					placeholder={texts_a.add_comment}
					stringLabel={texts_c.comment}
					rows={6}
				/>
			</Grid>
		</Grid>
	);
};
