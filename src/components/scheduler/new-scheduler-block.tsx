import Grid from "@mui/material/Grid";
import { SchedulerForm } from "components/scheduler/scheduler-form";

export const NewSchedulerBlock = () => {
	return (
		<Grid container>
			<Grid item xs={12} sm={9} md={6}>
				<SchedulerForm />
			</Grid>
		</Grid>
	);
};
