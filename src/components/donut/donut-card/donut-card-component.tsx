import { FC } from "react";
import { BntCard } from "shared/card/card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntCardActionArea } from "shared/card/card-action-area";
import { BntCardBody } from "shared/card/card-body";
import { BntTypography } from "shared/typography/typography";
import { BntStack } from "shared/stack/stack";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { DONUT_CARD_CLASSES } from "components/donut/donut-card/classes";
import { texts_o } from "services/localization/texts/texts_o";
import { TDonut } from "@/types/model";

export const DonutCardComponent: FC<{
	donut: TDonut;
	className?: string;
}> = ({ donut, className }) => {
	const { translate } = useBntTranslate();
	const { showDonut } = useDonutUi(donut);

	const onShowDonut = () => {
		showDonut();
	};

	const { on_stock = 0, logo, price, name } = donut;
	return (
		<BntCard raised className={className}>
			<BntCardActionArea
				onClick={onShowDonut}
				className={DONUT_CARD_CLASSES.cardHover}
			>
				<BntCardBody className={`${DONUT_CARD_CLASSES.cardBody} m-10`}>
					<BntStack
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={2}
					>
						<div className={DONUT_CARD_CLASSES.cardHeaderHover}>
							<img
								src={logo?.thumb?.url || undefined}
								alt="..."
								className={DONUT_CARD_CLASSES.logo}
							/>
						</div>
						<BntTypography variant="h6">
							{translate("Price")}: {price}
						</BntTypography>
						<BntTypography variant="h6">{name}</BntTypography>
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
