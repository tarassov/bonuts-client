import { FC } from "react";
import { BntForm } from "shared/form/bnt-form";

import { useShareAllFormFields } from "components/share-all/use-share-all-form-fields";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_o } from "services/localization/texts/texts_o";

export const ShareAllForm: FC<{
	onSuccess?: (args: { amount: number; comment: string; toSelfAccount: boolean }) => void;
}> = ({ onSuccess }) => {
	const { fields } = useShareAllFormFields();
	const { t } = useBntTranslate();
	const onSubmit = (args: { amount: number; comment: string; toSelfAccount: boolean }) => {
		onSuccess?.(args);
	};

	return (
		<BntForm
			formId="transfer-donuts"
			onSubmit={onSubmit}
			fields={fields}
			submitCaption={t(texts_o.ok)}
		/>
	);
};