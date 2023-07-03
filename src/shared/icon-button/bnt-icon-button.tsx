import { FC } from "react";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";

export const BntIconButton: FC<IconButtonProps & { tooltip?: string }> = (props) => {
	const { tooltip, ...rest } = props;
	const { t } = useBntTranslate();
	if (tooltip) {
		return (
			<Tooltip title={t(tooltip)}>
				<IconButton {...props} />
			</Tooltip>
		);
	}

	return <IconButton {...rest} />;
};
