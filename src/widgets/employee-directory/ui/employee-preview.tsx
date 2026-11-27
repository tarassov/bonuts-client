import { useParams } from "react-router-dom";

import { useModal } from "@/shared/lib/modal";
import { useLoader } from "@/shared/ui/loader";

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
	const { deactivateWithConfirmation, setActivity } = useEmployee();

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
			showTransfer({
				id: employee.id,
				name: employee.name || employee.user_name,
				avatarUrl: employee.user_avatar?.preview?.url || employee.user_avatar?.url,
			});
		}
	};

	const onActivateClick = () => {
		if (employee?.active === false) {
			setActivity({ id: employee.id, active: true });
		}
	};

	const onDisableClick = () => {
		if (employee?.active === true) {
			deactivateWithConfirmation(employee.id, employee.user_name || employee.name);
		}
	};

	return (
		<EmployeePreviewView
			employee={employee}
			onImageClick={onImageClick}
			allowAdminDeposit={profile?.admin}
			allowDisable={Boolean(profile?.admin && employee?.active === true)}
			allowEdit={profile?.admin}
			allowActivate={Boolean(profile?.admin && employee?.active === false)}
			onAdminDepositClick={onAdminDepositClick}
			onTransferClick={onTransferClick}
			onActivateClick={onActivateClick}
			onDisableClick={onDisableClick}
		/>
	);
}
