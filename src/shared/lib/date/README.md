# Date Helpers

Shared date/time helpers live in this folder and are exported through [index.ts](./index.ts).

## Import

```ts
import {
	formatStringDate,
	getLocalTimeZone,
	getMonthDayOptions,
	getTimezones,
	getWeekdayOptions,
	secondsToDateObject,
	secondsToTime,
	timeToSecondsFromMidnight,
	useFormattedDate,
} from "@/shared/lib/date";
```

## Methods

- `formatStringDate(date, short, useTime, locale, onlyTime, utc)`:
  Formats an input date string to localized text (`dd.MM.yyyy`, `dd MMMM`, optional `HH:mm`).
  Example:
  ```ts
  formatStringDate("2024-01-05T13:45:00.000Z"); // "05.01.2024"
  formatStringDate("2024-01-05T13:45:00.000Z", true); // "05 January" (locale-dependent)
  formatStringDate("2024-01-05T13:45:00.000Z", false, true); // "05.01.2024 13:45"
  formatStringDate("2024-01-05T13:45:00.000Z", false, false, undefined, true, true); // "13:45"
  ```
- `getLocalTimeZone()`:
  Returns the local browser/system IANA timezone, for example `Europe/Moscow`.
  Example:
  ```ts
  const timezone = getLocalTimeZone(); // "Europe/Moscow", "Asia/Almaty", etc.
  ```
- `getMonthDayArray()`:
  Returns day numbers from `1` to `31`.
  Example:
  ```ts
  // [1, 2, 3, ... 31]
  const days = getMonthDayArray();
  ```
- `getMonthDayOptions()`:
  Returns select options with `{ id, label }` for month days.
  Example:
  ```ts
  // [{ id: 1, label: 1 }, ...]
  const options = getMonthDayOptions();
  ```
- `getWeekdayOptions()`:
  Returns weekday options with localization keys (`monday`..`sunday`).
  Example:
  ```ts
  // [{ id: 1, label: "monday" }, ...]
  const weekdays = getWeekdayOptions();
  ```
- `getTimezones()`:
  Returns a static IANA timezone to label map used by timezone selectors.
  Example:
  ```ts
  const tzMap = getTimezones();
  tzMap["Europe/London"]; // "Edinburgh, London"
  tzMap.GMT; // "UTC"
  ```
- `secondsToTime(seconds)`:
  Converts seconds since midnight to an ISO date-time string for today.
  Example:
  ```ts
  secondsToTime(3661); // today at 01:01:01 as ISO string
  ```
- `secondsToDateObject(seconds)`:
  Converts seconds since midnight to a `Date` object for today.
  Example:
  ```ts
  const date = secondsToDateObject(3661);
  date.getHours(); // 1
  date.getMinutes(); // 1
  date.getSeconds(); // 1
  ```
- `timeToSecondsFromMidnight(time)`:
  Converts a date-time string to elapsed seconds from that day midnight.
  Example:
  ```ts
  timeToSecondsFromMidnight("2024-01-05T01:01:01.000Z"); // 3661 (timezone-dependent)
  ```
- `useFormattedDate()`:
  Hook that returns `getFormattedDate(isoDate)` to format short localized dates.
  Example:
  ```tsx
  import { useFormattedDate } from "@/shared/lib/date";

  export function Example() {
  	const { getFormattedDate } = useFormattedDate();
  	return <span>{getFormattedDate("2024-06-10")}</span>;
  }
  ```

## Practical Usage Patterns

Scheduler model conversion:
```ts
const isoTime = secondsToTime(9 * 3600 + 30 * 60); // 09:30 today
const seconds = timeToSecondsFromMidnight(isoTime); // back to 34200
```

Localized select controls:
```ts
const dayOptions = getMonthDayOptions();
const weekdayOptions = getWeekdayOptions().map((item) => ({
	...item,
	label: t(item.label, { capitalize: true }),
}));
```

Timezone selection defaults:
```ts
const tzMap = getTimezones();
const localTz = getLocalTimeZone();
const localCaption = tzMap[localTz] || localTz;
```
