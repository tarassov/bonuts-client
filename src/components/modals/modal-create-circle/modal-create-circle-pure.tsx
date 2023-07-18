import { FC } from "react";
import { TFormValue } from "shared/form/types/bnt-form";
import { Box } from "@mui/material";
import { CircleForm } from "components/circle/circle-form/circle-form";

export const ModalCreateCirclePure: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
}> = ({ onSubmit }) => {
	return (
		<Box sx={{ m: 3, minHeight: "80px", minWidth: "300px" }}>
			<CircleForm onSubmit={onSubmit} />
		</Box>
	);
};
