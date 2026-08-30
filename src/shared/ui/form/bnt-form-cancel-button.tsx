import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts";

import { BntTransparentButton } from "@/shared/ui/buttons";

type TBntFormCancelButtonProps = {
	isOutlined?: boolean;
	onClick?: VoidFunction;
};

export const BntFormCancelButton = ({ isOutlined = false, onClick }: TBntFormCancelButtonProps) => {
	const { translate } = useBntTranslate();

	return (
		<BntTransparentButton data-testid="form-cancel-button" color={isOutlined ? "inherit" : "secondary"} variant={isOutlined ? "outlined" : "text"} onClick={onClick}>
			{translate(texts_c.cancel)}
		</BntTransparentButton>
	);
};
