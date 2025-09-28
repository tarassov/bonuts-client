import { styled } from "@mui/material/styles";

import { BntCard } from "shared/ui/card/card";

type TProps = { secondary?: boolean; opacity?: number };

export const GradientCard = styled(BntCard, {
	shouldForwardProp: (prop: PropertyKey) => !Object.keys({} as PropertyKey).includes(prop as string),
})<TProps>(({ theme, opacity, secondary }) => {
	const backgroundFrom = secondary ? theme.palette.secondary.light : theme.palette.primary.light;
	const backgroundTo = secondary ? theme.palette.secondary.veryLight : theme.palette.primary.veryLight;

	return {
		background: `linear-gradient(60deg, ${backgroundFrom},${backgroundTo})`,
		...(opacity ? { opacity } : null),
	};
});
