import { FC } from "react";
import { TFormValue } from "shared/form/types/bnt-form";

import { CircleForm } from "components/circle/circle-form/circle-form";
import { BntBox } from "shared/box/bnt-box";
import { TCircle } from "@/types/model";

export const ModalEditCirclePure: FC<{
	onSubmit: (values: Record<string, TFormValue>) => void;
	circle?: TCircle;
}> = ({ onSubmit, circle }) => {
	return (
		<BntBox sx={{ m: 3, minHeight: "80px", minWidth: "300px" }}>
			<CircleForm onSubmit={onSubmit} circle={circle} hasInitial />
		</BntBox>
	);
};
