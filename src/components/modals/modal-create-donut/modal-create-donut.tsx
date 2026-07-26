import { FC } from "react";

import { ModalCreateDonutPure } from "components/modals/modal-create-donut/modal-create-donut-pure";
import { PostDonutsApiResponse } from "services/api/bonuts-api";

import { TDialogProps } from "@/shared/ui/dialog";

import { type TPostDonutArgs, useCreateDonut } from "@/entities/donut";

export type TCreateDonutResult = PostDonutsApiResponse;

export const ModalCreateDonut: FC<TDialogProps<TCreateDonutResult>> = ({ close }) => {
	const { postDonut } = useCreateDonut();

	const onSubmit = (values: TPostDonutArgs) => {
		return postDonut(values, { onSuccess: close });
	};
	return <ModalCreateDonutPure onSubmit={onSubmit} />;
};
