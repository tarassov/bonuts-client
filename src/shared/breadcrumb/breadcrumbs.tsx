import React, { FC } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { EMPTY_FUNCTION } from "constants/functions";
import { BntStyledBreadcrumbs } from "shared/breadcrumb/styled-breadcrumbs";
import { Icon, Tooltip } from "@mui/material";
import { TBntBreadcrumb } from "../types/breadcrumbs";
import { BntStyledBreadcrumb } from "./styled-breadcrumb";

export const BntBreadcrumbs: FC<TBntBreadcrumb> = ({ items, className }) => {
	const { translate } = useBntTranslate();
	return (
		<div>
			<BntStyledBreadcrumbs
				className={className}
				separator={<NavigateNext fontSize="small" color="action" />}
			>
				{items.map((item) => {
					const { onClick = EMPTY_FUNCTION, link, label, icon, key, noTranslation } = item;
					const linkComponent: {
						component?: React.ForwardRefExoticComponent<
							LinkProps & React.RefAttributes<HTMLAnchorElement>
						>;
						to?: string;
					} = {
						...(link && { component: RouterLink, to: link }),
					};
					const breadcrumbLabel = noTranslation ? label : translate(label, { capitalize: true });
					return (
						<BntStyledBreadcrumb
							{...linkComponent}
							onClick={item.onClick ? () => onClick(item) : undefined}
							label={
								<Tooltip title={breadcrumbLabel}>
									<span>{breadcrumbLabel}</span>
								</Tooltip>
							}
							icon={<Icon>{icon}</Icon>}
							key={key}
							hasLink={!!link}
						/>
					);
				})}
			</BntStyledBreadcrumbs>
		</div>
	);
};
