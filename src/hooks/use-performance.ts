export const usePerformance = (measureName: string, limit: number = 1000) => {
	let t0: number;
	const isDevelop = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
	const profilerStart = () => {
		if (isDevelop) {
			t0 = performance.now();
		}
	};

	const profilerStop = () => {
		if (isDevelop) {
			const t1 = performance.now();

			if (t1 - t0 > limit) {
				// eslint-disable-next-line no-console
				console.info(
					`It took ${Math.round((t1 - t0) / 10) / 100} seconds to perform ${measureName}`
				);
			}
		}
	};

	return { profilerStart, profilerStop };
};
