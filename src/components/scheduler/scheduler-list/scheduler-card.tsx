import { BntCard } from "shared/card/card";
import { SCHEDULER_LIST_CLASSES } from "components/scheduler/scheduler-list/classes";
import { BntCardBody } from "shared/card/card-body";
import { BntStack } from "shared/stack/stack";
import { Box } from "@mui/material";
import { texts_d, texts_e, texts_n } from "services/localization/texts";
import { BntTypography } from "shared/typography/typography";
import { getWeekdayOptions } from "shared/helpers/get-weekday";
import { formatStringDate } from "utils/format-string-date";
import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { CommonStrings } from "constants/dictionary";
import { secondsToTime } from "shared/helpers/seconds-to-time";
import { TScheduler, TSchedulerType } from "@/types/model/scheduler";

export const SchedulerCard: FC<{
	preventEdit?: boolean;
	scheduler: TScheduler;
	openEdit: VoidFunction;
}> = ({ scheduler, preventEdit, openEdit }) => {
	const { t } = useBntTranslate();

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
									secondsToTime(scheduler.time_in_seconds),
									false,
									true,
									undefined,
									true,
									false
								)} ${scheduler.timezone ? `[${scheduler.timezone}]` : CommonStrings.EMPTY_STRING}`}
							</>
						</BntTypography>
					</Box>
				</BntStack>
			</BntCardBody>
		</BntCard>
	);
};
