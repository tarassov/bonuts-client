import { FC } from "react";
import { EmployeeCardStyled } from "components/employee/employee-card/employee-card-styled";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { useTransferUi } from "logic/ui/use-transfer-ui";
import { TProfile } from "@/types/model";

export type EmployeeCardProps = {
	employee: TProfile;
};
export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
	const { showEmployee } = useEmployeeUi(employee);
	const { showTransfer } = useTransferUi();

	return (
		<EmployeeCardStyled
			employee={employee}
			onCardClick={() => showEmployee()}
			onTransferClick={() => showTransfer(employee.id)}
		/>
	);
};
