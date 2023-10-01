import { useSnackbar } from "notistack";
import { ESeverity } from "services/notification/types/severity";
import { TNotify } from "services/notification/types/notify";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e } from "services/localization/texts/texts_e";
import { Button } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const useNotification = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { t } = useBntTranslate();

	const showNotification = (message: string, severity?: ESeverity): TNotify => {
		const key = enqueueSnackbar(t(message), {
			variant: severity || ESeverity.Success,
			action: (snackbarId) => {
				return (
					<Button
						sx={{ textTransform: "none", color: "black" }}
						onClick={() => closeSnackbar(snackbarId)}
					>
						<CloseOutlined />
					</Button>
				);
			},
		});
		return { closeNotify: () => closeSnackbar(key) };
	};
	const showGeneralError = () => {
		enqueueSnackbar(t(texts_e.error), {
			variant: ESeverity.Error,
			action: (snackbarId) => {
				return (
					<Button
						sx={{ textTransform: "none", color: "black" }}
						onClick={() => closeSnackbar(snackbarId)}
					>
						<CloseOutlined />
					</Button>
				);
			},
		});
	};
	return { showNotification, showGeneralError };
};
