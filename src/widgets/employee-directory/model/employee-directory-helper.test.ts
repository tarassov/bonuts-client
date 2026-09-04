import { describe, expect, it } from "vitest";

import { getEmployeeInitials, getMonthsInTeam, getUpcomingBirthday, isNewTeammate } from "./employee-directory-helper";
import type { TProfile } from "@/types/model";

const now = new Date(2026, 8, 4);

const employees: Array<TProfile> = [
	{ id: 1, name: "Вил Виттон", in_date: "2024-09-04" },
	{ id: 2, name: "Бернадетт Ростеновски", in_date: "2026-08-04" },
];

describe("employee directory helper", () => {
	it("builds initials from a colleague name", () => {
		expect(getEmployeeInitials({ id: 1, name: "Моника Стюарт" })).toBe("МС");
	});

	it("calculates tenure and newcomer status from the join date", () => {
		expect(getMonthsInTeam(employees[1], now)).toBe(1);
		expect(isNewTeammate(employees[1], now)).toBe(true);
		expect(isNewTeammate(employees[0], now)).toBe(false);
	});

	it("returns only birthdays inside the upcoming window", () => {
		expect(getUpcomingBirthday({ id: 1, birthdate: "1990-09-12" }, now)).toEqual(new Date(2026, 8, 12));
		expect(getUpcomingBirthday({ id: 2, birthdate: "1990-10-12" }, now)).toBeNull();
	});
});
