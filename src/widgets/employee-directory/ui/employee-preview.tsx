import { useParams } from "react-router-dom";

import { useLoader } from "@/shared/ui/loader";

import { useModal } from "@/entities/modal";
import { useEmployee, useEmployeeLoader, useProfile } from "@/entities/profile";

import { EmployeePreviewView } from "./employee-preview-pure";
import { Modules } from "@/constants/modules";
import { useTransferUi } from "@/logic/ui/use-transfer-ui";

export function EmployeePreview() {
	const { id } = useParams();
	const { employee, isLoading, error } = useEmployeeLoader(id);
	const { ImageModal } = useModal();
	const { profile } = useProfile();
	const { showAdminDeposit, showTransfer } = useTransferUi();
	const { setActivityWithConfirmation, setActivity } = useEmployee();

	useLoader(Modules.EmployeePreview, isLoading && !error);

	const onImageClick = () => {
		if (employee?.user_avatar?.url) {
			ImageModal.show({ url: employee.user_avatar.url });
		}
	};

	const onAdminDepositClick = () => {
		if (employee) {
			showAdminDeposit(employee.id);
		}
	};

	const onTransferClick = () => {
		if (employee) {
			showTransfer(employee.id);
		}
	};

	const onActivateClick = () => {
		if (employee) {
			setActivity({ id: employee.id, active: true });
		}
	};

	const onDisableClick = () => {
		if (employee) {
			setActivityWithConfirmation({ id: employee.id, active: false });
		}
	};

	return (
		<EmployeePreviewView
			employee={employee}
			onImageClick={onImageClick}
			allowAdminDeposit={profile?.admin}
			allowDisable={profile?.admin}
			allowEdit={profile?.admin}
			allowActivate={profile?.admin}
			onAdminDepositClick={onAdminDepositClick}
			onTransferClick={onTransferClick}
			onActivateClick={onActivateClick}
			onDisableClick={onDisableClick}
		/>
	);
}
