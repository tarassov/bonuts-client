import { FC } from "react";

import { BntRegularButton } from "shared/ui/buttons/regular-button";
import { BntCard } from "shared/ui/card/card";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { Dictionary } from "constants/dictionary";

import { texts_o } from "services/localization/texts/texts_o";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useBonutsIcon } from "hooks/use-bonuts-icon";

import { useRequestLogic } from "logic/hooks/request/use-request-logic";

import { DonutPrice } from "./donut-price";
import { DonutRemainGrey } from "./donut-remain-grey";

import { TDonut } from "@/types/model";

export const DonutPurchaseBlock: FC<{
	donut: TDonut;
}> = ({ donut }) => {
	const { createRequest } = useRequestLogic();
	const { t } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();

	const onCreateRequest = () => {
		createRequest({ donut });
	};

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
			{donut?.has_remains && (
				<div className="m-5">
					<BntRegularButton onClick={onCreateRequest} className="width-100">
						{t(Dictionary.Buy)}
					</BntRegularButton>
				</div>
			)}
		</BntCard>
	);
};
