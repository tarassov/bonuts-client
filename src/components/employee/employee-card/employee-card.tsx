import { FC } from "react";
import { TProfile } from "@/types/model";

export type EmployeeCardProps = {
	employee: TProfile;
};
export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
	return <div>{employee.last_name}</div>;
};
