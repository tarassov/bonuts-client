export function hasOperationError(result: unknown): result is { error: unknown } {
	if (!result || typeof result !== "object" || !("error" in result)) {
		return false;
	}

	return Boolean(result.error);
}
