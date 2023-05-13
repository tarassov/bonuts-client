import { useSnackbar } from "notistack";
import { Severity } from "@/types/system/severity";

export const useNotification = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const showNotification = (message: string, severity?: Severity) => {
		enqueueSnackbar(message, { variant: severity || Severity.Success });
	};

	return { showNotification };
};
