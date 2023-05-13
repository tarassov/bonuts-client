import { enqueueSnackbar } from "notistack";
import { ESeverity } from "services/notification/types/severity";

export const showError = (error: string) => {
	enqueueSnackbar(error, { variant: ESeverity.Error });
};
