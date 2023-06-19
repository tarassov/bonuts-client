import { FC } from "react";
import { BntCard } from "shared/card/card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntCardActionArea } from "shared/card/card-action-area";
import { BntCardBody } from "shared/card/card-body";
import { BntTypography } from "shared/typography/typography";
import { BntStack } from "shared/stack/stack";
import { DONUT_CARD_CLASSES } from "components/donut/donut-card/classes";
import { texts_o } from "services/localization/texts/texts_o";
import classNames from "classnames";
import { DEFAULT_DONUT_IMAGE } from "constants/images";
import { TDonut } from "@/types/model";

export const DonutCardPure: FC<{
	donut: TDonut;
	onDonutClick: VoidFunction;
	className?: string;
}> = ({ donut, className, onDonutClick }) => {
	const { translate } = useBntTranslate();

	const { on_stock = 0, logo, price, name } = donut;
	return (
		<BntCard raised className={classNames(DONUT_CARD_CLASSES.donutCard, className)}>
			<BntCardActionArea onClick={onDonutClick} className={DONUT_CARD_CLASSES.cardHover}>
				<BntCardBody className={`${DONUT_CARD_CLASSES.cardBody} m-10`}>
					<BntStack
						direction="column"
						justifyContent="space-between"
						alignItems="center"
						spacing={3}
					>
						<div className={DONUT_CARD_CLASSES.cardHeaderHover}>
							<img
								src={logo?.thumb?.url || DEFAULT_DONUT_IMAGE}
								alt="..."
								className={DONUT_CARD_CLASSES.logo}
							/>
						</div>
						<div className={DONUT_CARD_CLASSES.captions}>
							<BntTypography variant="body1">
								{translate("Price")}: {price}
							</BntTypography>
							<BntTypography>{name}</BntTypography>
						</div>
					</BntStack>
					{on_stock > 0 && (
						<div className={DONUT_CARD_CLASSES.remains}>
							{translate(texts_o.on_stock)}: {on_stock}
						</div>
					)}
				</BntCardBody>
			</BntCardActionArea>
		</BntCard>
	);
};
