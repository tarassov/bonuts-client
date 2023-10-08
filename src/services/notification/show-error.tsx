import { enqueueSnackbar, closeSnackbar } from "notistack";
import { ESeverity } from "services/notification/types/severity";
import { Button } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const showError = (error: string) => {
	enqueueSnackbar(error, {
		preventDuplicate: true,
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
