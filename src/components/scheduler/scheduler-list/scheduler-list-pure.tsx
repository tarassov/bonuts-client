import { FC, useEffect, useState } from "react";
import { BntStack } from "shared/stack/stack";
import { SCHEDULER_LIST_CLASSES } from "components/scheduler/scheduler-list/classes";
import classNames from "classnames";
import { SchedulerCard } from "components/scheduler/scheduler-list/scheduler-card";
import { SchedulerForm } from "components/scheduler/scheduler-form";
import { emptyFunction } from "utils/empty-function";
import { BntDivider } from "shared/divider/bnt-divider";
import { texts_c } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TNewScheduler, TScheduler } from "@/types/model/scheduler";

export type SchedulerListPureProps = {
	schedulers?: Array<TScheduler>;
	className?: string;
	createMode?: boolean;
	closeCreateMode?: VoidFunction;
	onCreate?: (scheduler: TNewScheduler) => void;
	onUpdate?: (scheduler: TNewScheduler) => void;
};
export const SchedulerListPure: FC<SchedulerListPureProps> = ({
	schedulers,
	createMode,
	className,
	closeCreateMode = emptyFunction,
	onCreate,
	onUpdate,
}) => {
	const [editId, setEditId] = useState<number | undefined>();
	const { t } = useBntTranslate();
	useEffect(() => {
		if (editId !== undefined && createMode) setEditId(undefined);
	}, [createMode]);
	return (
		<BntStack
			direction="column"
			className={classNames(SCHEDULER_LIST_CLASSES.schedulerList, className)}
			gap={2}
		>
			{createMode && (
				<SchedulerForm
					onSubmit={onCreate}
					onCancel={closeCreateMode}
					submitCaption={t(texts_c.create)}
				/>
			)}
			{createMode && <BntDivider />}
			{schedulers?.map((scheduler) => {
				return (
					<SchedulerCard
						key={scheduler.id}
						scheduler={scheduler}
						onSubmit={onUpdate}
						// preventEdit={createMode}
						openEdit={() => {
							closeCreateMode();
							setEditId(scheduler.id);
						}}
						closeEdit={() => {
							if (scheduler.id === editId) setEditId(undefined);
						}}
						editId={editId}
					/>
				);
			})}
		</BntStack>
	);
};
