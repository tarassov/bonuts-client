import React, { FC } from "react";
import { LinkProps, Link as RouterLink } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
import { Icon, Tooltip } from "@mui/material";

import { EMPTY_FUNCTION } from "constants/functions";
import { useBntTranslate } from "hooks/use-bnt-translate";

import { BntStyledBreadcrumbs } from "@/shared/ui/breadcrumb/styled-breadcrumbs";
import type { TBntBreadcrumb } from "@/shared/ui/types";

import { BntStyledBreadcrumb } from "./styled-breadcrumb";

export const BntBreadcrumbs: FC<TBntBreadcrumb> = ({ items, className }) => {
	const { translate } = useBntTranslate();
	return (
		<div>
			<BntStyledBreadcrumbs className={className} separator={<NavigateNext fontSize="small" sx={{ color: "text.secondary" }} />}>
				{items.map((item) => {
					const { onClick = EMPTY_FUNCTION, link, label, icon, key, noTranslation } = item;
					const linkComponent: {
						component?: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
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
