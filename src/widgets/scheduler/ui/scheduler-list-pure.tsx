import { FC, useEffect, useState } from "react";
import classNames from "classnames";

import { BntDivider } from "shared/ui/divider/bnt-divider";
import { BntStack } from "shared/ui/stack/stack";

import { emptyFunction } from "utils/empty-function";

import { texts_c } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { TNewScheduler, TScheduler } from "@/types/model/scheduler";
import { SCHEDULER_LIST_CLASSES } from "@/widgets/scheduler/ui/classes";
import { SchedulerCard } from "@/widgets/scheduler/ui/scheduler-card";
import { SchedulerCardEdit } from "@/widgets/scheduler/ui/scheduler-card-edit";
import { SchedulerForm } from "@/widgets/scheduler/ui/scheduler-form";

export type SchedulerListPureProps = {
	schedulers?: Array<TScheduler>;
	className?: string;
	createMode?: boolean;
	closeCreateMode?: VoidFunction;
	onCreate?: (scheduler: TNewScheduler) => void;
	onUpdate?: (scheduler: TNewScheduler) => void;
	onDelete?: (id: number) => void;
};
export const SchedulerListPure: FC<SchedulerListPureProps> = ({
	schedulers,
	createMode,
	className,
	closeCreateMode = emptyFunction,
	onCreate,
	onUpdate,
	onDelete = emptyFunction,
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
				if (editId === scheduler.id) {
					return (
						<SchedulerCardEdit
							key={scheduler.id}
							scheduler={scheduler}
							onSubmit={onUpdate}
							onDelete={() => onDelete(scheduler.id)}
							closeEdit={() => {
								if (scheduler.id === editId) setEditId(undefined);
							}}
						/>
					);
				}
				return (
					<SchedulerCard
						key={scheduler.id}
						scheduler={scheduler}
						// preventEdit={createMode}
						openEdit={() => {
							closeCreateMode();
							setEditId(scheduler.id);
						}}
					/>
				);
			})}
		</BntStack>
	);
};
