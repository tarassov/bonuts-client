import { ArrowBackRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";

import { TransferForm } from "@/features/donut-transfer";

import type { TSelectedEmployee } from "../model/modal-give-donut-model";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b } from "@/services/localization/texts";

interface IModalGiveDonutTransferStepProps {
	employee: TSelectedEmployee;
	onBack: VoidFunction;
	onError: (message?: string) => void;
	onSuccess: VoidFunction;
}

export function ModalGiveDonutTransferStep({ employee, onBack, onError, onSuccess }: IModalGiveDonutTransferStepProps) {
	const { t } = useBntTranslate();

	return (
		<BntStack gap={2}>
			<BntStack direction="row" alignItems="center">
				<IconButton aria-label={t(texts_b.back, { capitalize: true })} onClick={onBack} size="small">
					<ArrowBackRounded fontSize="small" />
				</IconButton>
			</BntStack>
			<TransferForm id={employee.id} recipient={employee} onSuccess={onSuccess} onError={onError} />
		</BntStack>
	);
}
