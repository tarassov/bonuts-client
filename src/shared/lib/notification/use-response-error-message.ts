import { getResponseErrorMessage } from "./get-response-error-message";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

export const useResponseErrorMessage = () => {
	const { translate } = useBntTranslate();

	const getLocalizedResponseErrorMessage = (error: unknown) => {
		const errorMessage = getResponseErrorMessage(error);

		return translate(errorMessage) || null;
	};

	return { getLocalizedResponseErrorMessage };
};
