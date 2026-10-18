import type { FC } from "react";

import type { TDialogProps } from "@/shared/ui/dialog";

import type { TTransferRecipient } from "@/features/donut-transfer";
import { TransferForm } from "@/features/donut-transfer";

export const ModalTransfer: FC<TDialogProps & { recipient: TTransferRecipient }> = ({ close, recipient }) => {
	return <TransferForm id={recipient.id} recipient={recipient} onSuccess={close} />;
};
