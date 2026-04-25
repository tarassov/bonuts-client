import { FC } from "react";

import { CircleForm } from "components/circle/circle-form/circle-form";

import { BntBox } from "@/shared/ui/box";
import { TFormValue } from "@/shared/ui/form";

export const ModalCreateCirclePure: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
}> = ({ onSubmit }) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "80px", minWidth: "300px" }}>
			<CircleForm onSubmit={onSubmit} />
		</BntBox>
	);
};
