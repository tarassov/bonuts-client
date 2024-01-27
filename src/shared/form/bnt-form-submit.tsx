import { Stack } from "@mui/material";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { texts_c, texts_s } from "services/localization/texts";
import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";

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
					<BntTransparentButton color="secondary" onClick={onCancelClick}>
						{translate(texts_c.cancel)}
					</BntTransparentButton>

					<BntTransparentButton type="submit">
						{submitCaption || translate(texts_s.save)}
					</BntTransparentButton>
				</>
			)}
		</Stack>
	);
};
