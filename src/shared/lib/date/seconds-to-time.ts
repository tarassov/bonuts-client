import { addSeconds } from "date-fns";

/**
 * Converts seconds from midnight to an ISO date-time string anchored to today.
 */
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

/**
 * Converts seconds from midnight to a Date object anchored to today.
 */
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
