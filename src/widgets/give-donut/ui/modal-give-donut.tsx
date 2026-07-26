import { type ReactNode, useCallback, useMemo, useState } from "react";

import { useDebounceCallback } from "usehooks-ts";

import { type TDialogProps } from "@/shared/ui/dialog";
import { useNotification } from "@/shared/ui/notification";

import { useEmployeeList, useProfile } from "@/entities/profile";

import { GiveDonutStep, type TSelectedEmployee } from "../model/modal-give-donut-model";

import { ModalGiveDonutSearchStep } from "./modal-give-donut-search-step";
import { ModalGiveDonutSuccessStep } from "./modal-give-donut-success-step";
import { ModalGiveDonutTransferStep } from "./modal-give-donut-transfer-step";

export function ModalGiveDonut({ close }: TDialogProps) {
	const [step, setStep] = useState<GiveDonutStep>(GiveDonutStep.Search);
	const [query, setQuery] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedEmployee, setSelectedEmployee] = useState<TSelectedEmployee | null>(null);

	const debouncedSetSearchQuery = useDebounceCallback(setSearchQuery, 500);
	const { showGeneralError } = useNotification();
	const { profile } = useProfile();
	const { objects: employees = [], isLoading } = useEmployeeList({ searchText: searchQuery || undefined });

	const colleagueList = useMemo(() => {
		return employees.filter((employee) => employee.id !== profile?.id);
	}, [employees, profile?.id]);

	const handleBackToSearch = () => {
		setStep(GiveDonutStep.Search);
	};

	const handleEmployeeSelect = (employee: TSelectedEmployee) => {
		setSelectedEmployee(employee);
		setStep(GiveDonutStep.Transfer);
	};

	const handleQueryChange = useCallback(
		(value: string) => {
			setQuery(value);
			debouncedSetSearchQuery(value.trim());
		},
		[debouncedSetSearchQuery]
	);

	const handleTransferError = (_message?: string) => {
		showGeneralError();
	};

	const handleTransferSuccess = () => {
		setStep(GiveDonutStep.Success);
	};

	const stepContentByStep = {
		[GiveDonutStep.Search]: <ModalGiveDonutSearchStep colleagues={colleagueList} isLoading={isLoading} query={query} onEmployeeSelect={handleEmployeeSelect} onQueryChange={handleQueryChange} />,
		[GiveDonutStep.Transfer]: selectedEmployee ? (
			<ModalGiveDonutTransferStep employee={selectedEmployee} onBack={handleBackToSearch} onSuccess={handleTransferSuccess} onError={handleTransferError} />
		) : null,
		[GiveDonutStep.Success]: selectedEmployee ? <ModalGiveDonutSuccessStep onClose={close} /> : null,
	} satisfies Record<GiveDonutStep, ReactNode>;

	return stepContentByStep[step];
}
