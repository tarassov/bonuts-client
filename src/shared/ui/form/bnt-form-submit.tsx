import { FC } from "react";
import { Stack } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_s } from "services/localization/texts";

import { BntTransparentButton } from "@/shared/ui/buttons";

export const BntFormSubmit: FC<{
	onCancelClick?: VoidFunction;
	visible?: boolean;
	submitCaption?: string;
}> = ({ onCancelClick, visible = false, submitCaption }) => {
	const { translate } = useBntTranslate();
	return (
		<Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
			{visible && (
				<>
					<BntTransparentButton data-testid="form-cancel-button" color="secondary" onClick={onCancelClick}>
						{translate(texts_c.cancel)}
					</BntTransparentButton>

					<BntTransparentButton data-testid="form-submit-button" type="submit">
						{submitCaption || translate(texts_s.save)}
					</BntTransparentButton>
				</>
			)}
		</Stack>
	);
};
