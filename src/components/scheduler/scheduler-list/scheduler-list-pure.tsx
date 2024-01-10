import { FC } from "react";
import { BntStack } from "shared/stack/stack";
import { BntCard } from "shared/card/card";
import { BntCardBody } from "shared/card/card-body";
import { SCHEDULER_LIST_CLASSES } from "components/scheduler/scheduler-list/classes";
import classNames from "classnames";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_d, texts_e, texts_n } from "services/localization/texts";
import { Box } from "@mui/material";
import { BntTypography } from "shared/typography/typography";
import { getWeekdayOptions } from "shared/helpers/get-weekday";
import { formatStringDate } from "utils/format-string-date";
import { TScheduler, TSchedulerType } from "@/types/model/scheduler";

export type SchedulerListPureProps = { schedulers?: Array<TScheduler>; className?: string };
export const SchedulerListPure: FC<SchedulerListPureProps> = ({ schedulers, className }) => {
	const { t } = useBntTranslate();
	return (
		<BntStack
			direction="column"
			className={classNames(SCHEDULER_LIST_CLASSES.schedulerList, className)}
			gap={2}
		>
			{schedulers?.map((scheduler) => {
				return (
					<BntCard raised className={SCHEDULER_LIST_CLASSES.schedulerCard}>
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
											)}`}
										</>
									</BntTypography>
								</Box>
							</BntStack>
						</BntCardBody>
					</BntCard>
				);
			})}
		</BntStack>
	);
};
