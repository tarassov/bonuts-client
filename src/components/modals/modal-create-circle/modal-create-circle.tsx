import { ModalCreateCirclePure } from "components/modals/modal-create-circle/modal-create-circle-pure";
import { PostCirclesApiResponse } from "services/api/bonuts-api";

import { TDialogProps } from "@/shared/ui/dialog";
import { TFormValue } from "@/shared/ui/form";

import { useCreateCircle } from "logic/hooks/cirlce/use-create-circle";

export type TCreateCircleResult = PostCirclesApiResponse;

export function ModalCreateCircle({ close }: TDialogProps<TCreateCircleResult>) {
	const { createCircle } = useCreateCircle();

	const onSubmit = (values: Record<string, TFormValue>) => {
		return createCircle(values, { onSuccess: close });
	};
	return <ModalCreateCirclePure onSubmit={onSubmit} />;
}
