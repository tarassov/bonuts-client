import { ReactSVG } from "react-svg";
import { ElementType } from "react";
import { emptyFunction } from "utils/empty-function";
import { iconNames } from "@/config/icon-names";

const ROOT_PATH = "/assets/icons/";

export type Attributes = {
	width: string | number;
	height: string | number;
};

export const useIcons = (attributes?: Partial<Attributes>) =>
	iconNames.reduce(
		(acc, name) => ({
			...acc,
			[name]: () => (
				<ReactSVG
					src={`${ROOT_PATH}${name}.svg`}
					beforeInjection={
						attributes
							? (svg) => {
									svg.classList.add(`svg-icon-${name}`);
									svg.setAttribute(
										"style",
										`width: ${attributes.width}; height: ${attributes.height}`
									);
							  }
							: emptyFunction
					}
				/>
			),
		}),
		{} as { [k in (typeof iconNames)[number]]: ElementType }
	);
