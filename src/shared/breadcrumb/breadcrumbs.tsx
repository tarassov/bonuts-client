import React, { FC } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { EMPTY_FUNCTION } from "constants/functions";
import { BntStyledBreadcrumbs } from "shared/breadcrumb/styled-breadcrumbs";
import { Tooltip } from "@mui/material";
import { TBntBreadcrumb } from "../types/breadcrumbs";
import { BntStyledBreadcrumb } from "./styled-breadcrumb";

export const BntBreadcrumbs: FC<TBntBreadcrumb> = ({ items, className }) => {
	const { translate } = useBntTranslate();
	return (
		<div>
			<BntStyledBreadcrumbs
				className={className}
				separator={<NavigateNext fontSize="small" color="info" />}
			>
				{items.map((item) => {
					const { onClick = EMPTY_FUNCTION, link, label, icon, key } = item;
					const linkComponent: {
						component?: React.ForwardRefExoticComponent<
							LinkProps & React.RefAttributes<HTMLAnchorElement>
						>;
						to?: string;
					} = {
						...(link && { component: RouterLink, to: link }),
					};
					return (
						<BntStyledBreadcrumb
							{...linkComponent}
							onClick={item.onClick ? () => onClick(item) : undefined}
							label={
								<Tooltip title={translate(label, { capitalize: true })}>
									<span>{translate(label, { capitalize: true })}</span>
								</Tooltip>
							}
							icon={icon}
							key={key}
							hasLink={!!link}
						/>
					);
				})}
			</BntStyledBreadcrumbs>
		</div>
	);
};
