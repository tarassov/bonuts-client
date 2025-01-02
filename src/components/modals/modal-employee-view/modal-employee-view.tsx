import { FC, useEffect } from "react";
import { useEmployeeLoader } from "logic/hooks/employee/use-employee-loader";
import * as React from "react";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { ModalEmployeeViewStyled } from "components/modals/modal-employee-view/modal-employee-view-styled";
import { TModalProps } from "shared/ui/types/dialog-types";
import { emptyFunction } from "utils/empty-function";

export type ModalEmployeeViewProps = {
	id: number;
};
export const ModalEmployeeView: FC<ModalEmployeeViewProps & TModalProps> = ({
	id,
	close = emptyFunction,
	setModalLoading = emptyFunction,
}) => {
	const { isLoading, employee } = useEmployeeLoader(id);
	const { showEmployee } = useEmployeeUi(employee);

	useEffect(() => {
		setModalLoading(isLoading);
	}, [isLoading]);

	const onGoToEmployeeClick = () => {
		if (employee?.id) {
			showEmployee(employee?.id);
			close();
		}
	};

	return (
		<ModalEmployeeViewStyled
			employee={employee}
			onGoToEmployeeClick={onGoToEmployeeClick}
			isLoading={isLoading}
		/>
	);
};
