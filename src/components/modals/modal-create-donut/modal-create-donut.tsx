import { useCreateDonut } from "logic/hooks/donut/use-create-donut";
import { TFormValue } from "shared/ui/form/types/bnt-form";
import { ModalCreateDonutPure } from "components/modals/modal-create-donut/modal-create-donut-pure";
import { FC } from "react";
import { TModalProps } from "shared/ui/types/dialog-types";
import { emptyFunction } from "utils/empty-function";

export const ModalCreateDonut: FC<TModalProps> = ({ close = emptyFunction }) => {
	const { postDonut } = useCreateDonut();

	const onSubmit = (values: Record<string, TFormValue>) => {
		return postDonut(values, { onSuccess: close });
	};
	return <ModalCreateDonutPure onSubmit={onSubmit} />;
};
