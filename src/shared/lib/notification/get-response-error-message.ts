import { present } from "@/shared/lib/type-guards";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
	return typeof error === "object" && error !== null && ("status" in error || "data" in error);
};

const hasFetchBaseQueryErrorMessage = (error: FetchBaseQueryError): error is FetchBaseQueryError & { error: string } => {
	return "error" in error;
};

const isSerializedError = (error: unknown): error is SerializedError => {
	return typeof error === "object" && error !== null && "message" in error;
};

const getStringValue = (value: unknown) => {
	if (typeof value === "string") {
		return value;
	}

	if (Array.isArray(value)) {
		const stringValues = value.filter((item): item is string => typeof item === "string");

		if (present(stringValues)) {
			return stringValues.join(", ");
		}
	}

	return null;
};

const getObjectErrorMessage = (value: unknown) => {
	if (!value || typeof value !== "object") return null;

	if ("message" in value) {
		const message = getStringValue(value.message);

		if (message) {
			return message;
		}
	}

	if ("error" in value) {
		const error = getStringValue(value.error);

		if (error) {
			return error;
		}
	}

	if ("errors" in value) {
		const errors = getStringValue(value.errors);

		if (errors) {
			return errors;
		}
	}

	return null;
};

export const getResponseErrorMessage = (error: unknown) => {
	if (isFetchBaseQueryError(error)) {
		const dataMessage = getObjectErrorMessage(error.data);

		if (dataMessage) {
			return dataMessage;
		}
	}

	if (isFetchBaseQueryError(error) && hasFetchBaseQueryErrorMessage(error)) {
		return error.error;
	}

	if (isSerializedError(error) && typeof error.message === "string") {
		return error.message;
	}

	return null;
};
