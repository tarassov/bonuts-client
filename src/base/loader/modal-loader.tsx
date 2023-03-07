import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import { FC } from "react";

const style = {
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "row",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	p: 4,
};

export const BNTModalLoader: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<Modal
			aria-labelledby="modal-loader-title"
			aria-describedby="modal-loader-description"
			open={loading}
		>
			<Box sx={style}>
				<CircularProgress />
			</Box>
		</Modal>
	);
};
