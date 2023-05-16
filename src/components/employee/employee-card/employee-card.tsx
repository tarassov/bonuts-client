import { FC } from "react";
import { EmployeeCardStyled } from "components/employee/employee-card/employee-card-styled";
import { TProfile } from "@/types/model";

export type EmployeeCardProps = {
	employee: TProfile;
};
export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
	const onClick = () => {};
	return <EmployeeCardStyled employee={employee} onCardClick={onClick} />;
};
