import { useParams } from "react-router-dom";
import { useLoader } from "shared/loader/hooks/use-loader";
import { useEffect } from "react";
import { Modules } from "constants/modules";
import { useModal } from "hooks/use-modal";
import { useEmployeeLogic } from "logic/hooks/employee/use-employee-logic";
import { EmployeePreviewStyled } from "components/employee/employee-preview/employee-preview-styled";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { useTransferUi } from "logic/ui/use-transfer-ui";

export const EmployeePreview = () => {
	const { id } = useParams();
	const { setLoading } = useLoader();
	const { employee, isLoading, error } = useEmployeeLogic(id);
	const { ImageModal } = useModal();
	const { profile } = useProfileLogic();
	const { showAdminDeposit, showTransfer } = useTransferUi();

	useEffect(() => {
		setLoading(Modules.EmployeePreview, isLoading && !error);
	}, [isLoading, error]);

	const onImageClick = () => {
		ImageModal.show({ url: employee?.user_avatar?.url || "" });
	};

	const onAdminDeposit = () => {
		if (employee) {
			showAdminDeposit(employee.id);
		}
	};
	const onTransfer = () => {
		if (employee) {
			showTransfer(employee.id);
		}
	};

	return (
		<EmployeePreviewStyled
			employee={employee}
			onImageClick={onImageClick}
			allowAdminDeposit={profile?.admin}
			allowDisable={profile?.admin}
			onAdminDepositClick={onAdminDeposit}
			onTransferClick={onTransfer}
		/>
	);
};
