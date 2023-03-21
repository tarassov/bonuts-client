import React, { FC, MouseEventHandler, ReactNode } from "react";
import { TBntBreadcrump } from "../types/breadcrumbs";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { BntStyledBreadcrumb } from "./styled-breadcrump";
import { EMPTY_FUNCTION } from "../../constants/functions";
import { useBntTranslate } from "../../hooks/use-bnt-translate";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { NavigateNext } from "@mui/icons-material";
export const BntBreadcrumbs: FC<TBntBreadcrump> = ({ items, className }) => {
	const { translate } = useBntTranslate();
	return (
		<div>
			<Breadcrumbs
				className={className}
				separator={<NavigateNext fontSize="small" color={"info"} />}
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
							label={translate(label)}
							icon={icon}
							key={key}
							hasLink={!!link}
						/>
					);
				})}
			</Breadcrumbs>
		</div>
	);
};
