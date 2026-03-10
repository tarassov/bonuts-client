import { ComponentType } from "react";
import { ReactSVG } from "react-svg";
import { useTheme } from "@mui/material";

import { emptyFunction } from "utils/empty-function";

import { present } from "@/shared/lib/type-guards";

import { iconNames } from "@/app/config/icon-names";

const ROOT_PATH = "/assets/icons/";

export type Attributes = {
	width?: string | number;
	height?: string | number;
	color?: string;
	fill?: string;
};

export const useIcons = (attributes: Partial<Attributes> = {}) => {
	const theme = useTheme();
	const { width, height, color = theme.palette.text.primary, fill } = attributes;

	return iconNames.reduce(
		(acc, name) => ({
			...acc,
			[name]: () => (
				<ReactSVG
					src={`${ROOT_PATH}${name}.svg`}
					beforeInjection={
						present(attributes)
							? (svg) => {
									svg.classList.add(`svg-icon-${name}`);
									svg.setAttribute("style", `width: ${width}; height: ${height}`);
									svg.setAttribute("stroke", color);
									if (fill) svg.setAttribute("fill", fill);
								}
							: emptyFunction
					}
				/>
			),
		}),
		{} as { [k in (typeof iconNames)[number]]: ComponentType }
	);
};
