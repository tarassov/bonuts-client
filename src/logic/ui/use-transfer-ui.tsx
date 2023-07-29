import { texts_a } from "services/localization/texts";
import { useModal } from "hooks/use-modal";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_t } from "services/localization/texts/texts_t";

export const useTransferUi = () => {
	const { AdminDepositModal, TransferModal } = useModal();
	const { t } = useBntTranslate();
	const showAdminDeposit = (id: number) => {
		AdminDepositModal.show({
			id,
			title: t(texts_a.admin_deposit, { capitalize: true }),
		});
	};
	const showTransfer = (id: number) => {
		TransferModal.show({
			id,
			title: t(texts_t.transfer_donuts, { capitalize: true }),
		});
	};
	return { showAdminDeposit, showTransfer };
};
