import { DonutCreateForm } from "components/donut/donut-create-form/donut-create-form";
import { FC } from "react";
import { TFormValue } from "shared/ui/form/types/bnt-form";
import { BntBox } from "shared/ui/box/bnt-box";
import { TDonut } from "@/types/model";
import { TPostDonutArgs } from "@/entities/donut";

export const ModalCreateDonutPure: FC<{
	onSubmit: (values: TPostDonutArgs) => void;
}> = ({ onSubmit }) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "220px" }}>
			<DonutCreateForm onSubmit={onSubmit} />
		</BntBox>
	);
};
