import { TFormValue } from "shared/ui/form/types/bnt-form";
import { TModalProps } from "shared/ui/types/dialog-types";

import { emptyFunction } from "utils/empty-function";

import { useCreateCircle } from "logic/hooks/cirlce/use-create-circle";

import { ModalCreateCirclePure } from "components/modals/modal-create-circle/modal-create-circle-pure";

export function ModalCreateCircle({ close = emptyFunction }: TModalProps) {
	const { createCircle } = useCreateCircle();

	const onSubmit = (values: Record<string, TFormValue>) => {
		return createCircle(values, { onSuccess: close });
	};
	return <ModalCreateCirclePure onSubmit={onSubmit} />;
}
