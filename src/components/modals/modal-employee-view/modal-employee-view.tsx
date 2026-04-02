import * as React from "react";
import { FC, useEffect } from "react";

import { ModalEmployeeViewStyled } from "components/modals/modal-employee-view/modal-employee-view-styled";
import { TDialogProps } from "shared/ui/dialog/dialog-types";
import { emptyFunction } from "utils/empty-function";

import { useEmployeeLoader } from "@/entities/profile";

import { useEmployeeUi } from "logic/ui/use-employee-ui";

export type ModalEmployeeViewProps = {
	id: number;
};
export const ModalEmployeeView: FC<ModalEmployeeViewProps & TDialogProps> = ({ id, close = emptyFunction, setModalLoading = emptyFunction }) => {
	const { isLoading, employee } = useEmployeeLoader(id);
	const { showEmployee } = useEmployeeUi(employee);

	// biome-ignore lint/correctness/useExhaustiveDependencies: during migration
	useEffect(() => {
		setModalLoading(isLoading);
	}, [isLoading]);

	const onGoToEmployeeClick = () => {
		if (employee?.id) {
			showEmployee(employee?.id);
			close();
		}
	};

	return <ModalEmployeeViewStyled employee={employee} onGoToEmployeeClick={onGoToEmployeeClick} isLoading={isLoading} />;
};
