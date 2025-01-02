import { BntCard } from "shared/ui/card/card";
import { SCHEDULER_LIST_CLASSES } from "components/scheduler/scheduler-list/classes";
import { BntCardBody } from "shared/ui/card/card-body";
import { BntStack } from "shared/ui/stack/stack";

import { texts_d, texts_e, texts_n } from "services/localization/texts";
import { BntTypography } from "shared/ui/typography/typography";
import { getWeekdayOptions } from "shared/lib/get-weekday";
import { formatStringDate } from "utils/format-string-date";
import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { CommonStrings } from "constants/dictionary";
import { secondsToTime } from "shared/lib/seconds-to-time";
import { BntBox } from "shared/ui/box/bnt-box";
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
					<BntBox>{scheduler.name || t(texts_n.no_name, { capitalize: true })}</BntBox>
					<BntBox>
						<BntTypography variant="caption2">
							{`${scheduler.amount}  ${t("donut", { count: scheduler.amount })} `}
							{`${
								scheduler.every === TSchedulerType.weekly
									? t(texts_e.every_week)
									: t(texts_e.every_month)
							}`}
						</BntTypography>
					</BntBox>
					<BntBox>
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
					</BntBox>
				</BntStack>
			</BntCardBody>
		</BntCard>
	);
};
