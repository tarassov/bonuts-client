import { ModalCreateCirclePure } from "components/modals/modal-create-circle/modal-create-circle-pure";
import { emptyFunction } from "utils/empty-function";

import { TDialogProps } from "@/shared/ui/dialog";
import { TFormValue } from "@/shared/ui/form";

import { useCreateCircle } from "logic/hooks/cirlce/use-create-circle";

export function ModalCreateCircle({ close = emptyFunction }: TDialogProps) {
	const { createCircle } = useCreateCircle();

	const onSubmit = (values: Record<string, TFormValue>) => {
		return createCircle(values, { onSuccess: close });
	};
	return <ModalCreateCirclePure onSubmit={onSubmit} />;
}
