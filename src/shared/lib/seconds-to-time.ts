import { addSeconds } from "date-fns";

export const secondsToTime = (seconds?: number) => {
	const d = new Date();
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	if (seconds) {
		return addSeconds(d, seconds).toISOString();
	}

	return d.toISOString();
};
export const secondsToDateObject = (seconds?: number) => {
	const d = new Date();
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	if (seconds) {
		return addSeconds(d, seconds);
	}

	return d;
};
