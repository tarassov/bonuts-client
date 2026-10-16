import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import type { TTransferRecipient } from "../model/use-transfer-form-fields";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n, texts_s } from "@/services/localization/texts";

export function TransferRecipient({ recipient }: { recipient: TTransferRecipient }) {
	const { t } = useBntTranslate();
	const name = recipient.name || t(texts_n.no_name);

	return (
		<BntStack alignItems="center" direction="row" gap={1.5}>
			<ProfileAvatar avatarUrl={recipient.avatarUrl} name={name} />
			<BntTypography color="text.secondary" variant="body2">
				{t(texts_s.sending_to, { capitalize: true })} <strong>{name}</strong>
			</BntTypography>
		</BntStack>
	);
}
