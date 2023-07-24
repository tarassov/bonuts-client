import { FC } from "react";
import { Icon, IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";

export const BntIconButton: FC<IconButtonProps & { tooltip?: string; customIcon?: boolean }> = (
	props
) => {
	const { tooltip, customIcon, children, ...rest } = props;
	const { t } = useBntTranslate();
	if (tooltip) {
		return (
			<Tooltip title={t(tooltip)}>
				{!customIcon ? (
					<IconButton {...rest}>{children}</IconButton>
				) : (
					<IconButton {...rest}>
						<Icon>{children}</Icon>
					</IconButton>
				)}
			</Tooltip>
		);
	}
	if (!customIcon) return <IconButton {...rest}>{children}</IconButton>;
	return (
		<IconButton {...props}>
			<Icon>{children}</Icon>
		</IconButton>
	);
};
