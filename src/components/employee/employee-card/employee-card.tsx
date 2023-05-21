import { FC } from "react";
import { EmployeeCardStyled } from "components/employee/employee-card/employee-card-styled";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { TProfile } from "@/types/model";

export type EmployeeCardProps = {
	employee: TProfile;
};
export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
	const { showEmployee } = useEmployeeUi(employee);

	return <EmployeeCardStyled employee={employee} onCardClick={() => showEmployee()} />;
};
