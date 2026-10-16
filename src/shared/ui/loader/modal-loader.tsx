import * as React from "react";
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import { emptyFunction } from "utils/empty-function";

export const BntModalLoader: FC<{ loading?: boolean }> = ({ loading = false }) => {
	return (
		<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={emptyFunction}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
