import Grid from "@mui/material/Grid";
import { SchedulerForm } from "components/scheduler/scheduler-form";
import { useCreateScheduler } from "logic/hooks/scheduler/use-create-scheduler";

export const NewSchedulerBlock = () => {
	const { createScheduler } = useCreateScheduler();
	return (
		<Grid container>
			<Grid item xs={12} sm={9} md={6}>
				<SchedulerForm onSubmit={createScheduler} />
			</Grid>
		</Grid>
	);
};
