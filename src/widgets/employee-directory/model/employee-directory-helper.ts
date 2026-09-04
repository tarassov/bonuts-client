import type { TProfile } from "@/types/model";

const NEW_TEAMMATE_MONTHS = 3;

function getEmployeeName(employee: TProfile) {
	return employee.name || [employee.first_name, employee.last_name].filter(Boolean).join(" ") || employee.email || "";
}

export function getEmployeeInitials(employee: TProfile) {
	const name = getEmployeeName(employee).trim();

	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() || "")
		.join("");
}

export function getMonthsInTeam(employee: TProfile, now = new Date()) {
	const startDateValue = employee.in_date || employee.created_at;

	if (!startDateValue) {
		return null;
	}

	const startDate = new Date(startDateValue);

	if (Number.isNaN(startDate.getTime())) {
		return null;
	}

	const months = (now.getFullYear() - startDate.getFullYear()) * 12 + now.getMonth() - startDate.getMonth();
	const isBeforeMonthAnniversary = now.getDate() < startDate.getDate();

	return Math.max(0, months - (isBeforeMonthAnniversary ? 1 : 0));
}

export function isNewTeammate(employee: TProfile, now = new Date()) {
	const monthsInTeam = getMonthsInTeam(employee, now);

	return monthsInTeam !== null && monthsInTeam <= NEW_TEAMMATE_MONTHS;
}

export function getUpcomingBirthday(employee: TProfile, now = new Date(), daysAhead = 14) {
	if (!employee.birthdate) {
		return null;
	}

	const birthdate = new Date(employee.birthdate);

	if (Number.isNaN(birthdate.getTime())) {
		return null;
	}

	const birthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	if (birthday < today) {
		birthday.setFullYear(birthday.getFullYear() + 1);
	}

	const daysUntilBirthday = Math.round((birthday.getTime() - today.getTime()) / 86_400_000);

	return daysUntilBirthday <= daysAhead ? birthday : null;
}
