import type { FC } from "react";

import type { TDialogProps } from "@/shared/ui/dialog";
import { BntStack } from "@/shared/ui/stack";

import type { TTransferRecipient } from "@/features/donut-transfer";
import { TransferForm } from "@/features/donut-transfer";

export const ModalTransfer: FC<TDialogProps & { recipient: TTransferRecipient }> = ({ close, recipient }) => {
	return (
		<BntStack gap={2} sx={{ p: 3 }}>
			<TransferForm id={recipient.id} recipient={recipient} onSuccess={close} />
		</BntStack>
	);
};
