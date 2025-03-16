import { useMemo } from "react";
import { useFormState, useWatch } from "react-hook-form";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Grid, Tooltip, useMediaQuery, useTheme } from "@mui/material";

import { getMonthDayOptions } from "shared/lib/get-month-day-array";
import { TimezoneSelect } from "shared/ui/form/special-fileds/timezone-select";
import { WeekdayDaySelect } from "shared/ui/form/special-fileds/weekday-day-select";
import { BntSwitchElement } from "shared/ui/input/bnt-switch-element";
import { BntSelectElement } from "shared/ui/input/select-element";
import { BntTextAreaInput } from "shared/ui/input/text-area-input";
import { BntTextInputElement } from "shared/ui/input/text-input-element";
import { BntTimePickerElement } from "shared/ui/input/time-picker-element";
import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { texts_a, texts_b, texts_c, texts_e, texts_n, texts_t } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TScheduler } from "@/types/model/scheduler";
import { SchedulerTypes } from "@/widgets/scheduler/constants/scheduler-types";

export const SchedulerFormFields = () => {
	const { t } = useBntTranslate();
	const { errors } = useFormState<TScheduler>();
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
						className={!smallScreen ? "pl-2" : undefined}
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
						maxWidth="400px"
						fullWidth
						className={!smallScreen ? "pl-2" : undefined}
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
					name="time"
					ampm={false}
					format="HH:mm"
					required
					fullWidth
				/>
				<BntStack direction="row" className="pt-1" gap={1}>
					<Tooltip title={t(texts_t.tooltip_scheduler_time, { capitalize: true })}>
						<ErrorOutlineOutlined color="secondary" sx={{ height: 16, width: 16 }} />
					</Tooltip>
					<BntTypography variant="caption">
						{t(texts_a.approximate_action_time, { capitalize: true })}
					</BntTypography>
				</BntStack>
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
			<Grid item xs={12} className="mt-2">
				<BntSwitchElement name="burn_old" stringLabel={texts_b.burn_unused_donuts} />
			</Grid>
		</Grid>
	);
};
