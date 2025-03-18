import { FC, useEffect, useState } from "react";

import { BntDivider } from "shared/ui/divider/bnt-divider";

import { emptyFunction } from "utils/empty-function";

import { texts_c } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { SchedulerCard } from "./scheduler-card";
import { SchedulerCardEdit } from "./scheduler-card-edit";
import { SchedulerForm } from "./scheduler-form";
import { SchedulerStack } from "./scheduler-stack";

import type { TNewScheduler, TScheduler } from "@/types/model/scheduler";

export type SchedulerListProps = {
	closeCreateMode?: VoidFunction;
	schedulers?: Array<TScheduler>;
	className?: string;
	createMode?: boolean;
	onCreate?: (scheduler: TNewScheduler) => void;
	onUpdate?: (scheduler: TNewScheduler) => void;
	onDelete?: (id: number) => void;
};
export const SchedulerList: FC<SchedulerListProps> = ({
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
	}, [createMode, editId]);
	return (
		<SchedulerStack direction="column" className={className} gap={2}>
			{createMode && (
				<SchedulerForm
					onSubmit={onCreate}
					onCancel={closeCreateMode}
					submitCaption={t(texts_c.create)}
				/>
			)}
			{createMode && <BntDivider />}
			{schedulers?.map((scheduler) => {
				const isEditMode = editId === scheduler.id;
				return (
					<div key={scheduler.id}>
						{isEditMode ? (
							<SchedulerCardEdit
								scheduler={scheduler}
								onSubmit={onUpdate}
								onDelete={() => onDelete(scheduler.id)}
								closeEdit={() => {
									if (scheduler.id === editId) setEditId(undefined);
								}}
							/>
						) : (
							<SchedulerCard
								scheduler={scheduler}
								openEdit={() => {
									closeCreateMode();
									setEditId(scheduler.id);
								}}
							/>
						)}
					</div>
				);
			})}
		</SchedulerStack>
	);
};
