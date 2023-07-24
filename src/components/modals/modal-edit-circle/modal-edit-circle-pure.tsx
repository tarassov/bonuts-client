import { FC } from "react";
import { TFormValue } from "shared/form/types/bnt-form";
import { Box } from "@mui/material";
import { CircleForm } from "components/circle/circle-form/circle-form";
import { TCircle } from "@/types/model";

export const ModalEditCirclePure: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
	circle?: TCircle;
}> = ({ onSubmit, circle }) => {
	return (
		<Box sx={{ m: 3, minHeight: "80px", minWidth: "300px" }}>
			<CircleForm onSubmit={onSubmit} circle={circle} hasInitial />
		</Box>
	);
};
