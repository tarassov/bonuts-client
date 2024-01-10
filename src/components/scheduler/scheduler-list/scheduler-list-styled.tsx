import { styled } from "@mui/material/styles";
import { SchedulerListPure } from "components/scheduler/scheduler-list/scheduler-list-pure";
import { cl } from "themes/helper";
import { SCHEDULER_LIST_CLASSES } from "components/scheduler/scheduler-list/classes";

export const SchedulerListStyled = styled(
	SchedulerListPure,
	{}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
)(({ theme }) => {
	return {
		maxWidth: 700,
		[cl(SCHEDULER_LIST_CLASSES.schedulerCard)]: {
			display: "flex",
			paddingTop: 12,
			paddingLeft: 12,
			justifyContent: "flex-start",
			minHeight: 100,
		},
	};
});
