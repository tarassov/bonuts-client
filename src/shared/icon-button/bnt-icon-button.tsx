import { FC, ReactNode } from "react";
import { Icon, IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntBadge } from "shared/badge/bnt-badge";

export const BntIconButton: FC<
	IconButtonProps & {
		tooltip?: string;
		customIcon?: boolean;
		badgeContent?: ReactNode;
		badgeColor?:
			| "secondary"
			| "primary"
			| "default"
			| "error"
			| "info"
			| "success"
			| "warning"
			| undefined;
	}
> = (props) => {
	const { tooltip, customIcon, children, badgeContent, badgeColor, ...rest } = props;
	const { t } = useBntTranslate();
	const IconComponent = !customIcon ? (
		<IconButton {...rest}>
			<BntBadge badgeContent={badgeContent} color={badgeColor} invisible={!badgeContent}>
				{children}
			</BntBadge>
		</IconButton>
	) : (
		<IconButton {...rest}>
			<BntBadge badgeContent={badgeContent} color={badgeColor} invisible={!badgeContent}>
				<Icon>{children}</Icon>
			</BntBadge>
		</IconButton>
	);
	if (tooltip) {
		return (
			<Tooltip placement="bottom-start" title={t(tooltip)}>
				{IconComponent}
			</Tooltip>
		);
	}
	return IconComponent;
};
