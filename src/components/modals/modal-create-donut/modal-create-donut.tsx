import { FC } from "react";
import { TModalProps } from "shared/ui/types/dialog-types";

import { emptyFunction } from "utils/empty-function";

import { ModalCreateDonutPure } from "components/modals/modal-create-donut/modal-create-donut-pure";

import { type TPostDonutArgs, useCreateDonut } from "@/entities/donut";

export const ModalCreateDonut: FC<TModalProps> = ({ close = emptyFunction }) => {
	const { postDonut } = useCreateDonut();

	const onSubmit = (values: TPostDonutArgs) => {
		return postDonut(values, { onSuccess: close });
	};
	return <ModalCreateDonutPure onSubmit={onSubmit} />;
};
