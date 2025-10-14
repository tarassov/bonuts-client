import { FC } from "react";
import classNames from "classnames";

import { BntCard } from "shared/ui/card/card";
import { BntCardActionArea } from "shared/ui/card/card-action-area";
import { BntCardBody } from "shared/ui/card/card-body";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { DEFAULT_DONUT_IMAGE } from "constants/images";

import { texts_o } from "services/localization/texts/texts_o";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useBonutsIcon } from "hooks/use-bonuts-icon";

import { DONUT_CARD_CLASSES } from "components/donut/donut-card/classes";

import { TDonut } from "@/types/model";

export const DonutCardPure: FC<{
	donut: TDonut;
	onDonutClick: VoidFunction;
	className?: string;
}> = ({ donut, className, onDonutClick }) => {
	const { translate } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();

	const { on_stock = 0, logo, price, name } = donut;
	return (
		<BntCard raised className={classNames(DONUT_CARD_CLASSES.donutCard, className)}>
			<BntCardActionArea onClick={onDonutClick} className={DONUT_CARD_CLASSES.cardHover}>
				<BntCardBody className={`${DONUT_CARD_CLASSES.cardBody} m-10`}>
					<BntStack direction="column" justifyContent="space-between" alignItems="center" spacing={3}>
						<div className={DONUT_CARD_CLASSES.cardHeaderHover}>
							<img src={logo?.thumb?.url || DEFAULT_DONUT_IMAGE} alt="..." className={DONUT_CARD_CLASSES.logo} />
						</div>
						<div className={DONUT_CARD_CLASSES.captions}>
							<BntTypography variant="body1">
								<BntStack direction="row">
									{translate("Price")}: {price}
									<BonutsCurrency />
								</BntStack>
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
