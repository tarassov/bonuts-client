import { CloseOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

import { closeSnackbar, enqueueSnackbar } from "notistack";

import { ESeverity } from "./types/severity";

export const showError = (error: string) => {
	enqueueSnackbar(error, {
		preventDuplicate: true,
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
