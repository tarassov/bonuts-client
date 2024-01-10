import { SchedulerForm } from "components/scheduler/scheduler-form";
import { useCreateScheduler } from "logic/hooks/scheduler/use-create-scheduler";
import { useState } from "react";
import { BntButton } from "shared/buttons/bnt-button";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a } from "services/localization/texts";
import { Box } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { TNewScheduler } from "@/types/model/scheduler";

export const NewSchedulerBlock = () => {
	const { createScheduler } = useCreateScheduler();
	const { t } = useBntTranslate();
	const [createMode, setCreateMode] = useState(false);

	if (!createMode) {
		return (
			<BntButton
				startIcon={<AddOutlined />}
				onClick={() => setCreateMode(true)}
				sx={{ maxWidth: 700 }}
			>
				{t(texts_a.add_new_scheduler, { capitalize: true })}{" "}
			</BntButton>
		);
	}
	const onCreateScheduler = (scheduler: TNewScheduler) => {
		createScheduler(scheduler, { onSuccess: () => setCreateMode(false) });
	};

	return (
		<Box sx={{ maxWidth: 700 }}>
			<SchedulerForm onSubmit={onCreateScheduler} onCancel={() => setCreateMode(false)} />
		</Box>
	);
};
