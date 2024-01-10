import { useLoader } from "shared/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useSchedulerListLoader } from "logic/hooks/scheduler/use-scheduler-list-loader";
import { SchedulerListStyled } from "components/scheduler/scheduler-list/scheduler-list-styled";

export const SchedulersList = () => {
	const { objects: schedulers, isLoading } = useSchedulerListLoader();
	useLoader(Modules.Schedulers, isLoading);

	return <SchedulerListStyled schedulers={schedulers} />;
};
