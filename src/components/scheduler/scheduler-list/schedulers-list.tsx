import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useSchedulerListLoader } from "logic/hooks/scheduler/use-scheduler-list-loader";
import { SchedulerListStyled } from "components/scheduler/scheduler-list/scheduler-list-styled";
import { useMediaQuery, useTheme } from "@mui/material";
import { BntStack } from "shared/stack/stack";
import { NewSchedulerBlock } from "components/scheduler/new-scheduler-block";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";
import { useState } from "react";
import { useScheduler } from "logic/hooks/scheduler/use-scheduler";
import { useModal } from "hooks/use-modal";
import { texts_a, texts_s } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TNewScheduler } from "@/types/model/scheduler";

export const SchedulersList = () => {
	const { objects: schedulers, isLoading } = useSchedulerListLoader();
	const { createScheduler, updateScheduler, deleteScheduler } = useScheduler();
	const [createMode, setCreateMode] = useState(false);
	const { ConfirmationModal } = useModal();
	useLoader(Modules.Schedulers, isLoading);
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const { t } = useBntTranslate();

	const onCreate = (scheduler: TNewScheduler) => {
		createScheduler(scheduler, { onSuccess: () => setCreateMode(false) });
	};
	const onDelete = (id: number) => {
		ConfirmationModal.show({
			title: t(texts_s.scheduler_delete, { capitalize: true }),
			text: t(texts_a.are_you_sure_to_delete, { capitalize: true }),
			onSubmit: () => deleteScheduler(id),
		});
	};

	return (
		<BntStack
			direction="column"
			sx={{ height: "100%", overflow: "hidden" }}
			className={!smallScreen ? "ml-4" : undefined}
		>
			{!createMode ? <NewSchedulerBlock onClick={() => setCreateMode(true)} /> : null}
			<CardWrapper className="flex-grow scroll" transparent>
				<SchedulerListStyled
					schedulers={schedulers}
					createMode={createMode}
					closeCreateMode={() => setCreateMode(false)}
					onCreate={onCreate}
					onUpdate={updateScheduler}
					onDelete={onDelete}
				/>
			</CardWrapper>
		</BntStack>
	);
};
