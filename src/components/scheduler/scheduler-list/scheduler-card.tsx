import { BntCard } from "shared/card/card";
import { SCHEDULER_LIST_CLASSES } from "components/scheduler/scheduler-list/classes";
import { BntCardBody } from "shared/card/card-body";
import { BntStack } from "shared/stack/stack";
import { Box } from "@mui/material";
import { texts_a, texts_d, texts_e, texts_n } from "services/localization/texts";
import { BntTypography } from "shared/typography/typography";
import { getWeekdayOptions } from "shared/helpers/get-weekday";
import { formatStringDate } from "utils/format-string-date";
import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { SchedulerForm } from "components/scheduler/scheduler-form";
import { BntProfileButton } from "components/buttons/profile-button";
import { emptyFunction } from "utils/empty-function";
import classNames from "classnames";
import { CommonStrings } from "constants/dictionary";
import { TNewScheduler, TScheduler, TSchedulerType } from "@/types/model/scheduler";

export const SchedulerCard: FC<{
	preventEdit?: boolean;
	scheduler: TScheduler;
	onSubmit?: (scheduler: TNewScheduler) => void;
	openEdit: VoidFunction;
	closeEdit: VoidFunction;
	editId?: number;
}> = ({ scheduler, onSubmit, preventEdit, openEdit, closeEdit, editId }) => {
	const { t } = useBntTranslate();

	const handleSubmit = (newScheduler: TNewScheduler) => {
		onSubmit?.(newScheduler);
		closeEdit();
	};

	if (editId === scheduler.id) {
		return (
			<BntCard className={classNames("p-2")} raised>
				{scheduler.profile && (
					<BntStack justifyContent="flex-start" direction="row" alignItems="center" gap={2}>
						<BntTypography variant="caption2">
							{t(texts_a.author, { capitalize: true })}
						</BntTypography>
						<BntProfileButton profile={scheduler.profile} onClick={emptyFunction} />
					</BntStack>
				)}
				<SchedulerForm defaultValue={scheduler} onCancel={closeEdit} onSubmit={handleSubmit} />
			</BntCard>
		);
	}
	return (
		<BntCard
			raised
			className={SCHEDULER_LIST_CLASSES.schedulerCard}
			onClick={() => {
				if (!preventEdit) openEdit();
			}}
		>
			<BntCardBody className={SCHEDULER_LIST_CLASSES.schedulerCardBody}>
				<BntStack direction="column">
					<Box>{scheduler.name || t(texts_n.no_name, { capitalize: true })}</Box>
					<Box>
						<BntTypography variant="caption2">
							{`${scheduler.amount}  ${t("donut", { count: scheduler.amount })} `}
							{`${
								scheduler.every === TSchedulerType.weekly
									? t(texts_e.every_week)
									: t(texts_e.every_month)
							}`}
						</BntTypography>
					</Box>
					<Box>
						<BntTypography variant="caption2">
							<>
								{`${
									scheduler.every === TSchedulerType.weekly
										? t(getWeekdayOptions().find((x) => x.id === scheduler.weekday)?.label)
										: `${scheduler.day}  ${t(texts_d.day)}`
								}`}
								{` ${formatStringDate(
									scheduler.execute_time,
									false,
									true,
									undefined,
									true,
									true
								)} ${scheduler.timezone ? `[${scheduler.timezone}]` : CommonStrings.EMPTY_STRING}`}
							</>
						</BntTypography>
					</Box>
				</BntStack>
			</BntCardBody>
		</BntCard>
	);
};
