import { ArrowBackRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { TransferForm } from "@/features/donut-transfer";

import type { TSelectedEmployee } from "../model/modal-give-donut-model";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b, texts_s } from "@/services/localization/texts";

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
			<BntStack direction="row" alignItems="center" gap={1}>
				<IconButton aria-label={t(texts_b.back, { capitalize: true })} onClick={onBack} size="small">
					<ArrowBackRounded fontSize="small" />
				</IconButton>
				<BntTypography color="text.secondary" variant="body2">
					{t(texts_s.sending_to, { capitalize: true })} <strong>{employee.name}</strong>
				</BntTypography>
			</BntStack>
			<TransferForm id={employee.id} onSuccess={onSuccess} onError={onError} />
		</BntStack>
	);
}
