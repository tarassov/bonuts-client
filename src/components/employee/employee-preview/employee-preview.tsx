import { useParams } from "react-router-dom";
import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { useModal } from "hooks/use-modal";
import { useEmployeeLoader } from "logic/hooks/employee/use-employee-loader";
import { EmployeePreviewStyled } from "components/employee/employee-preview/employee-preview-styled";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { useTransferUi } from "logic/ui/use-transfer-ui";
import { useEmployee } from "logic/hooks/employee/use-employee";

export const EmployeePreview = () => {
	const { id } = useParams();
	const { employee, isLoading, error } = useEmployeeLoader(id);
	const { ImageModal } = useModal();
	const { profile } = useProfileLogic();
	const { showAdminDeposit, showTransfer } = useTransferUi();
	const { setActivityWithConfirmation, setActivity } = useEmployee();

	useLoader(Modules.EmployeePreview, isLoading && !error);

	const onImageClick = () => {
		if (employee?.user_avatar?.url) {
			ImageModal.show({ url: employee?.user_avatar?.url || "" });
		}
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
	const onActivate = () => {
		if (employee) {
			setActivity({ id: employee.id, active: true });
		}
	};

	const onDisable = () => {
		if (employee) {
			setActivityWithConfirmation({ id: employee.id, active: false });
		}
	};

	return (
		<EmployeePreviewStyled
			employee={employee}
			onImageClick={onImageClick}
			allowAdminDeposit={profile?.admin}
			allowDisable={profile?.admin}
			allowEdit={profile?.admin}
			allowActivate={profile?.admin}
			onAdminDepositClick={onAdminDeposit}
			onTransferClick={onTransfer}
			onActivateClick={onActivate}
			onDisableClick={onDisable}
		/>
	);
};
