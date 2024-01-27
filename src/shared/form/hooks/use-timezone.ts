import spacetime, { Spacetime } from "spacetime";
import { useMemo } from "react";
import { getTimezones } from "shared/helpers/get-timezones";
import soft from "timezone-soft";
import { ITimezone, ITimezoneOption } from "shared/types/timezones";
import { useBntTranslate } from "hooks/use-bnt-translate";

// thanks to https://github.com/ndom91/react-timezone-select/
export function useTimezone(): {
	parseTimezone: (zone: ITimezone | string | undefined) => ITimezoneOption | undefined | false;
	options: ITimezoneOption[];
} {
	const { t } = useBntTranslate();
	const options = useMemo(() => {
		const timezones = getTimezones();
		const timezoneOptions = Object.entries(timezones).map((zone) => {
			try {
				const now = spacetime.now(zone[0]);
				const isDstString = now.isDST() ? "daylight" : "standard";
				const tz = now.timezone();
				const tzStrings = soft(zone[0]);

				const abbr = tzStrings?.[0]?.[isDstString]?.abbr;
				const altName = tzStrings?.[0]?.[isDstString]?.name;

				const min = tz.current.offset * 60;
				// eslint-disable-next-line no-bitwise
				const hr = `${(min / 60) ^ 0}:${min % 60 === 0 ? "00" : Math.abs(min % 60)}`;
				const names = zone[1]
					.split(",")
					.map((x) => t(x.trim()))
					.join(", ");
				const prefix = `(${"GMT"}${hr.includes("-") ? hr : `+${hr}`}) ${names}`;

				const label = `${prefix} (${abbr})`;

				return {
					value: tz.name,
					label,
					offset: tz.current.offset,
					abbrev: abbr,
					altName,
				};
			} catch {
				return null;
			}
		});

		const filtered: ITimezoneOption[] = timezoneOptions.filter((x) => !!x) as ITimezoneOption[];
		return filtered.sort((a, b) => {
			return (a.offset || 0) - (b.offset || 0);
		});
	}, []);

	const findFuzzyTz = (zone: string): ITimezoneOption => {
		let currentTime: Spacetime;
		try {
			currentTime = spacetime.now(zone);
		} catch (err) {
			currentTime = spacetime.now("GMT");
		}

		return options
			.filter((tz: ITimezoneOption) => tz.offset === currentTime.timezone().current.offset)
			.map((tz: ITimezoneOption) => {
				let score = 0;
				if (
					currentTime.timezones[tz.value.toLowerCase()] &&
					!!currentTime.timezones[tz.value.toLowerCase()].dst === currentTime.timezone().hasDst
				) {
					if (
						tz.value
							.toLowerCase()
							.indexOf(currentTime.tz.substring(currentTime.tz.indexOf("/") + 1)) !== -1
					) {
						score += 8;
					}
					if (
						tz.label
							.toLowerCase()
							.indexOf(currentTime.tz.substring(currentTime.tz.indexOf("/") + 1)) !== -1
					) {
						score += 4;
					}
					if (
						tz.value.toLowerCase().indexOf(currentTime.tz.substring(0, currentTime.tz.indexOf("/")))
					) {
						score += 2;
					}
					score += 1;
				} else if (tz.value === "GMT") {
					score += 1;
				}
				return { tz, score };
			})
			.sort((a, b) => b.score - a.score)[0].tz;
	};

	const parseTimezone = (zone: ITimezone | string | undefined) => {
		if (!zone) return undefined;
		if (typeof zone === "object" && zone.value && zone.label) return zone;
		if (typeof zone === "string") {
			return (
				options.find((tz) => tz.value === zone) || (zone.indexOf("/") !== -1 && findFuzzyTz(zone))
			);
		}
		if (zone.value && !zone.label) {
			return options.find((tz) => tz.value === zone.value);
		}
		return undefined;
	};

	return { options, parseTimezone };
}
