import { useEffect, useState } from "react";

/** A clock that re-renders on an interval, so elapsed-time labels stay current without new data. */
export const useNow = (intervalMs: number): Date => {
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		const timer = window.setInterval(() => setNow(new Date()), intervalMs);

		return () => window.clearInterval(timer);
	}, [intervalMs]);

	return now;
};
