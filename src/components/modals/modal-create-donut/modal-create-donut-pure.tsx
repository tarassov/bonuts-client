import { DonutCreateForm } from "components/donut/donut-create-form/donut-create-form";
import { Box } from "@mui/material";

export const ModalCreateDonutPure = () => {
	return (
		<Box sx={{ m: 3, minHeight: "300px" }}>
			<DonutCreateForm />
		</Box>
	);
};
