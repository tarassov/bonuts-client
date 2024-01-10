import { NewSchedulerBlock } from "components/scheduler/new-scheduler-block";
import { BntStack } from "shared/stack/stack";
import { SchedulersList } from "components/scheduler/scheduler-list/schedulers-list";
import { useMediaQuery, useTheme } from "@mui/material";
import { CardWrapper } from "shared/card-wrapper/card-wrapper";

export const SchedulersPage = () => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntStack
			direction="column"
			sx={{ height: "100%", overflow: "hidden" }}
			className={!smallScreen ? "ml-4" : undefined}
		>
			<NewSchedulerBlock />
			<CardWrapper className="flex-grow scroll" transparent>
				<SchedulersList />
			</CardWrapper>
		</BntStack>
	);
};
