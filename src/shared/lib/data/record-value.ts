type TUnknownRecord = Record<string, unknown>;

/**
 * Returns the first finite number found under the supplied alternative keys.
 * Useful when an external API has not yet published a strict response schema.
 *
 * @example
 * getFirstFiniteNumber(summary, ["spent_coins", "coins_spent"]);
 */
export const getFirstFiniteNumber = (record: TUnknownRecord, keys: string[]): number | undefined => {
	for (const key of keys) {
		const value = record[key];
		const numberValue = typeof value === "string" || typeof value === "number" ? Number(value) : Number.NaN;

		if (Number.isFinite(numberValue)) return numberValue;
	}

	return undefined;
};

/**
 * Returns the first non-blank string found under the supplied alternative keys.
 * It lets presenter code prefer the backend's most descriptive available field.
 *
 * @example
 * getFirstNonEmptyString(operation, ["title", "name", "comment"]);
 */
export const getFirstNonEmptyString = (record: TUnknownRecord, keys: string[]): string | undefined => {
	for (const key of keys) {
		const value = record[key];

		if (typeof value === "string" && value.trim()) return value;
	}

	return undefined;
};
