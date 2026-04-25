import { CloseOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

import { useSnackbar } from "notistack";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_e } from "services/localization/texts/texts_e";

import { getResponseErrorMessage } from "@/shared/lib/notification";

import { TNotify } from "./types/notify";
import { ESeverity } from "./types/severity";

export const useNotification = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { t } = useBntTranslate();

	const showErrorNotification = (message: string) => {
		enqueueSnackbar(message, {
			variant: ESeverity.Error,
			action: (snackbarId) => {
				return (
					<Button sx={{ textTransform: "none", color: "black" }} onClick={() => closeSnackbar(snackbarId)}>
						<CloseOutlined />
					</Button>
				);
			},
		});
	};

	const showNotification = (message: string, severity?: ESeverity): TNotify => {
		const key = enqueueSnackbar(t(message), {
			variant: severity || ESeverity.Success,
			action: (snackbarId) => {
				return (
					<Button sx={{ textTransform: "none", color: "black" }} onClick={() => closeSnackbar(snackbarId)}>
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
					<Button sx={{ textTransform: "none", color: "black" }} onClick={() => closeSnackbar(snackbarId)}>
						<CloseOutlined />
					</Button>
				);
			},
		});
	};

	const showResponseError = (error: unknown) => {
		const errorMessage = getResponseErrorMessage(error);

		if (errorMessage) {
			showErrorNotification(errorMessage);
			return;
		}

		showGeneralError();
	};

	return { showNotification, showGeneralError, showResponseError };
};
