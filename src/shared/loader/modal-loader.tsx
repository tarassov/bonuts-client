import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { FC } from "react";

export const BntModalLoader: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
			onClick={() => {}}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
