import { TFormValue } from "shared/ui/form/types/bnt-form";
import { TModalProps } from "shared/ui/types/dialog-types";

import { emptyFunction } from "utils/empty-function";

import { useCircle } from "logic/hooks/cirlce/use-circle";
import { useCircleLoader } from "logic/hooks/cirlce/use-circle-loader";

import { ModalEditCirclePure } from "components/modals/modal-edit-circle/modal-edit-circle-pure";

import { TCircle } from "@/types/model";

export function ModalEditCircle({ close = emptyFunction, circleId }: TModalProps & { circleId: number }) {
	const { circle } = useCircleLoader(circleId);
	const { patchCircle } = useCircle();
	const onSubmit = (values: Record<string, TFormValue>) => {
		return patchCircle(circleId, values as TCircle, { onSuccess: close });
	};
	return <ModalEditCirclePure onSubmit={onSubmit} circle={circle} />;
}
