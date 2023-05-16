import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntCard } from "shared/card/card";
import { Dictionary } from "constants/dictionary";
import { BntTypography } from "shared/typography/typography";
import { BntRegularButton } from "shared/buttons/regular-button";
import { useRequestLogic } from "logic/hooks/request/use-request-logic";
import { texts_o } from "services/localization/texts/texts_o";
import { DonutRemainGrey } from "./donut-remain-grey";
import { DonutPrice } from "./donut-price";
import { TDonut } from "@/types/model";

export const DonutPurchaseBlock: FC<{
	donut: TDonut;
}> = ({ donut }) => {
	const { createRequest } = useRequestLogic();
	const { t } = useBntTranslate();

	const onCreateRequest = () => {
		createRequest({ donut });
	};

	return (
		<BntCard raised>
			<DonutPrice className="ml-20 mt-10">
				{donut.price} {t(Dictionary.PTS)}
			</DonutPrice>
			{donut.on_stock ? (
				<DonutRemainGrey className="ml-20">
					{t(texts_o.on_stock)}: {donut.on_stock}
				</DonutRemainGrey>
			) : null}
			{donut.on_stock === 0 && donut.supply_days ? (
				<BntTypography>
					{t(Dictionary.Delivery_days)}: {donut.supply_days}{" "}
				</BntTypography>
			) : null}
			{donut?.has_remains && (
				<div className="m-20">
					<BntRegularButton onClick={onCreateRequest} className="width-100">
						{t(Dictionary.Buy)}
					</BntRegularButton>
				</div>
			)}
		</BntCard>
	);
};
