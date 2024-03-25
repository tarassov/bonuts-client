import { DonutCreateForm } from "components/donut/donut-create-form/donut-create-form";
import { FC } from "react";
import { TFormValue } from "shared/form/types/bnt-form";
import { BntBox } from "shared/box/bnt-box";

export const ModalCreateDonutPure: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
}> = ({ onSubmit }) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "220px" }}>
			<DonutCreateForm onSubmit={onSubmit} />
		</BntBox>
	);
};
