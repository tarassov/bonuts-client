import { Alert, CircularProgress } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";

import type { TSelectedEmployee } from "../model/modal-give-donut-model";

import { ModalGiveDonutColleagueList } from "./modal-give-donut-colleague-list";
import { ModalGiveDonutSearchField } from "./modal-give-donut-search-field";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

interface IModalGiveDonutSearchStepProps {
	colleagues: Array<TProfile>;
	isLoading: boolean;
	query: string;
	onEmployeeSelect: (employee: TSelectedEmployee) => void;
	onQueryChange: (query: string) => void;
}

export function ModalGiveDonutSearchStep({ colleagues, isLoading, query, onEmployeeSelect, onQueryChange }: IModalGiveDonutSearchStepProps) {
	const { t } = useBntTranslate();

	if (isLoading) {
		return (
			<BntStack gap={2}>
				<ModalGiveDonutSearchField query={query} onQueryChange={onQueryChange} />
				<BntStack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
					<CircularProgress size={24} />
				</BntStack>
			</BntStack>
		);
	}

	return (
		<BntStack gap={2}>
			<ModalGiveDonutSearchField query={query} onQueryChange={onQueryChange} />
			{colleagues.length ? (
				<ModalGiveDonutColleagueList colleagues={colleagues} onEmployeeSelect={onEmployeeSelect} />
			) : (
				<Alert severity="info" variant="outlined">
					{t(texts_n.no_colleagues_found, { capitalize: true })}
				</Alert>
			)}
		</BntStack>
	);
}
