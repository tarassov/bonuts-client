import { DonutCreateForm } from "components/donut/donut-create-form/donut-create-form";
import { Box } from "@mui/material";
import { FC } from "react";
import { TFormValue } from "shared/form/types/bnt-form";

export const ModalCreateDonutPure: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
}> = ({ onSubmit }) => {
	return (
		<Box sx={{ m: 3, minHeight: "220px" }}>
			<DonutCreateForm onSubmit={onSubmit} />
		</Box>
	);
};
