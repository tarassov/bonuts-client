import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";

import { SCHEDULER_LIST_CLASSES } from "@/widgets/scheduler/ui/classes";
import { SchedulerListPure } from "@/widgets/scheduler/ui/scheduler-list-pure";

export const SchedulerListStyled = styled(
	SchedulerListPure,
	{}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
)(({ theme }) => {
	return {
		maxWidth: 700,
		paddingTop: 8,
		paddingRight: 4,
		paddingLeft: 8,
		paddingBottom: 24,
		[cl(SCHEDULER_LIST_CLASSES.schedulerCard)]: {
			"&:hover": {
				cursor: "pointer",
				outline: "2px solid",
				outlineColor: theme.palette.primary.light,
				"& img": {
					transform: "translate3d(0, -3px, 2px)",
					transition: "all 500ms cubic-bezier(0.34, 1.61, 0.7, 1)",
				},
			},
			display: "flex",
			paddingTop: 12,
			paddingLeft: 12,
			justifyContent: "flex-start",
			minHeight: 100,
		},
	};
});
