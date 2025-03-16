import { FC } from "react";

import { getWeekdayOptions } from "shared/lib/get-weekday";
import { secondsToTime } from "shared/lib/seconds-to-time";
import { BntBox } from "shared/ui/box/bnt-box";
import { BntCard } from "shared/ui/card/card";
import { BntCardBody } from "shared/ui/card/card-body";
import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { formatStringDate } from "utils/format-string-date";

import { CommonStrings } from "constants/dictionary";

import { texts_d, texts_e, texts_n } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TScheduler, TSchedulerType } from "@/types/model/scheduler";
import { SCHEDULER_LIST_CLASSES } from "@/widgets/scheduler/ui/classes";

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
