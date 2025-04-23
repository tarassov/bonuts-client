import { FC } from "react";

import { BntStack } from "shared/ui/stack/stack";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts";
import { TModalProps } from "shared/ui/types/dialog-types";
import { emptyFunction } from "utils/empty-function";
import { BntTransparentButton } from "shared/ui/buttons/transparent-button";
import { BntBox } from "shared/ui/box/bnt-box";
import { texts_y } from "@/services/localization/texts/texts_y";

export const ConfirmationModal: FC<TModalProps & { text?: string; onSubmit: VoidFunction }> = ({
	text,
	onSubmit,
	close = emptyFunction,
}) => {
	const { t } = useBntTranslate();
	const handleSubmit = () => {
		onSubmit();
		close();
	};

	return (
		<BntBox sx={{ m: 1 }}>
			<BntStack>
				<div className="flex-grow pl-2">{text}</div>
				<BntStack
					alignItems="center"
					justifyContent="center"
					flexDirection="row"
					gap={4}
					className="mt-2"
				>
					<BntTransparentButton color="error" onClick={() => close()}>
						{t(texts_c.cancel)}
					</BntTransparentButton>
					<BntTransparentButton color="success" onClick={handleSubmit}>
						{t(texts_y.yes)}
					</BntTransparentButton>
				</BntStack>
			</BntStack>
		</BntBox>
	);
};
