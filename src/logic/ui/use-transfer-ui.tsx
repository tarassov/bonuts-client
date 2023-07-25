import { texts_a } from "services/localization/texts";
import { useModal } from "hooks/use-modal";
import { useBntTranslate } from "hooks/use-bnt-translate";

export const useTransferUi = () => {
	const { AdminDepositModal } = useModal();
	const { t } = useBntTranslate();
	const showAdminDeposit = (id: number) => {
		AdminDepositModal.show({
			id,
			title: t(texts_a.admin_deposit, { capitalize: true }),
		});
	};

	return { showAdminDeposit };
};
