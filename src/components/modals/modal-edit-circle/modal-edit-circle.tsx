import { ModalEditCirclePure } from "components/modals/modal-edit-circle/modal-edit-circle-pure";
import { PatchCirclesByIdApiResponse } from "services/api/bonuts-api";

import { TDialogProps } from "@/shared/ui/dialog";
import { TFormValue } from "@/shared/ui/form";

import { useCircle } from "logic/hooks/cirlce/use-circle";
import { useCircleLoader } from "logic/hooks/cirlce/use-circle-loader";
import { TCircle } from "@/types/model";

export type TEditCircleResult = PatchCirclesByIdApiResponse;

export function ModalEditCircle({ close, circleId }: TDialogProps<TEditCircleResult> & { circleId: number }) {
	const { circle } = useCircleLoader(circleId);
	const { patchCircle } = useCircle();
	const onSubmit = (values: Record<string, TFormValue>) => {
		return patchCircle(circleId, values as TCircle, { onSuccess: close });
	};
	return <ModalEditCirclePure onSubmit={onSubmit} circle={circle} />;
}
