import type { FC, ReactNode } from "react";

import { HeroAside, HeroDescription, HeroEyebrow, HeroHeading, HeroRoot, HeroText, HeroTitle } from "./black-box-hero.styles";

type TBlackBoxHeroProps = {
	eyebrowIcon: ReactNode;
	eyebrow: string;
	title: string;
	description: string;
	/** Under the text, e.g. the numbers in one line. */
	footer?: ReactNode;
	/** The right side of the hero: the question form or the number tiles; it goes under the text on phones. */
	aside?: ReactNode;
};

export const BlackBoxHero: FC<TBlackBoxHeroProps> = ({ eyebrowIcon, eyebrow, title, description, footer, aside }) => (
	<HeroRoot>
		<HeroText>
			<HeroHeading>
				<HeroEyebrow>
					{eyebrowIcon}
					{eyebrow}
				</HeroEyebrow>
				<HeroTitle>{title}</HeroTitle>
				<HeroDescription>{description}</HeroDescription>
			</HeroHeading>
			{footer}
		</HeroText>
		{aside ? <HeroAside>{aside}</HeroAside> : null}
	</HeroRoot>
);
