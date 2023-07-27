import { TFormValue } from "shared/form/types/bnt-form";
import { FC } from "react";
import { TModalProps } from "shared/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { ModalEditCirclePure } from "components/modals/modal-edit-circle/modal-edit-circle-pure";
import { useCircle } from "logic/hooks/cirlce/use-circle";
import { useCircleLoader } from "logic/hooks/cirlce/use-circle-loader";
import { TCircle } from "@/types/model";

export const ModalEditCircle: FC<TModalProps & { circleId: number }> = ({
	close = emptyFunction,
	circleId,
}) => {
	const { circle } = useCircleLoader(circleId);
	const { patchCircle } = useCircle();
	const onSubmit = (values: Record<string, TFormValue>) => {
		return patchCircle(circleId, values as TCircle, { onSuccess: close });
	};
	return <ModalEditCirclePure onSubmit={onSubmit} circle={circle} />;
};
