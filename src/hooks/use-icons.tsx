import { ComponentType } from "react";
import { ReactSVG } from "react-svg";
import { useTheme } from "@mui/material";

import { emptyFunction } from "utils/empty-function";

import { present } from "@/shared/lib/type-guards";

import { iconNames } from "@/app/config/icon-names";

const ROOT_PATH = "/assets/icons/";

export enum ICON_VARIANTS {
	PRIMARY = "primary",
	SECONDARY = "secondary",
	ERROR = "error",
	INFO = "info",
	SUCCESS = "success",
	WARNING = "warning",
}

export type Attributes = {
	width?: string | number;
	height?: string | number;
	variant?: `${ICON_VARIANTS}`;
	color?: string;
	fill?: string;
};

export const useIcons = (attributes: Partial<Attributes> = {}) => {
	const theme = useTheme();
	const { width, height, color, fill, variant } = attributes;

	const variantColor = present(variant) ? theme.palette[variant]?.main : theme.palette.text.primary;
	const currentColor = present(color) ? color : variantColor;

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
									svg.setAttribute("color", currentColor);
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
