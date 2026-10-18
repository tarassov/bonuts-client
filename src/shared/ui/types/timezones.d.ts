export type ITimezoneOption = {
	value: string;
	label: string;
	abbrev?: string;
	altName?: string;
	offset?: number;
};

export type ITimezone = ITimezoneOption | string;
