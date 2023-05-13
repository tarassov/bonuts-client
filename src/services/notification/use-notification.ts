import { useSnackbar } from "notistack";
import { ESeverity } from "services/notification/types/severity";
import { TNotify } from "services/notification/types/notify";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e } from "services/localization/texts/texts_e";

export const useNotification = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { t } = useBntTranslate();

	const showNotification = (message: string, severity?: ESeverity): TNotify => {
		const key = enqueueSnackbar(t(message), { variant: severity || ESeverity.Success });
		return { closeNotify: () => closeSnackbar(key) };
	};
	const showGeneralError = () => {
		enqueueSnackbar(t(texts_e.error), { variant: ESeverity.Error });
	};

	return { showNotification, showGeneralError };
};
