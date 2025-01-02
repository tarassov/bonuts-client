import { differenceInSeconds } from "date-fns/fp";

export const timeToSecondsFromMidnight = (time?: string) => {
	if (!time) return 0;
	const startOfDay = new Date(time);
	startOfDay.setHours(0);
	startOfDay.setMinutes(0);
	startOfDay.setSeconds(0);
	return differenceInSeconds(startOfDay, new Date(time));
};
