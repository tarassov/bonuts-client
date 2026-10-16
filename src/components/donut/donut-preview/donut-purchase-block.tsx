import { FC } from "react";

import { Dictionary } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useBonutsIcon } from "hooks/use-bonuts-icon";
import { texts_o } from "services/localization/texts/texts_o";

import { BntCard } from "@/shared/ui/card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { DonutPurchaseButton, useDonutPurchase } from "@/features/donut-purchase";

import { DonutPrice } from "./donut-price";
import { DonutRemainGrey } from "./donut-remain-grey";
import type { TDonut } from "@/types/model";

export const DonutPurchaseBlock: FC<{
	donut: TDonut;
}> = ({ donut }) => {
	const { canPurchase, isPurchasing, purchaseDonut } = useDonutPurchase();
	const { t } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();

	return (
		<BntCard raised>
			<DonutPrice className="ml-5 mt-2">
				<BntStack direction="row">
					{donut.price} <BonutsCurrency />
				</BntStack>
			</DonutPrice>
			{donut.on_stock ? (
				<DonutRemainGrey className="ml-5">
					{t(texts_o.on_stock)}: {donut.on_stock}
				</DonutRemainGrey>
			) : null}
			{donut.on_stock === 0 && donut.supply_days ? (
				<BntTypography>
					{t(Dictionary.Delivery_days)}: {donut.supply_days}{" "}
				</BntTypography>
			) : null}
			{canPurchase(donut) && (
				<div className="m-5">
					<DonutPurchaseButton donut={donut} isPurchasing={isPurchasing} onPurchase={purchaseDonut} />
				</div>
			)}
		</BntCard>
	);
};
