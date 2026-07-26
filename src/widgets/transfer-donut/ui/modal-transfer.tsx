import type { FC } from "react";

import type { TDialogProps } from "@/shared/ui/dialog";

import { TransferForm } from "@/features/donut-transfer";

export const ModalTransfer: FC<TDialogProps & { id: number }> = ({ close, id }) => {
	return <TransferForm id={id} onSuccess={close} />;
};
