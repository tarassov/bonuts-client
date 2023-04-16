import { FC } from "react";
import { push } from "redux-first-history";
import { BntCard } from "shared/card/card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntCardActionArea } from "shared/card/card-action-area";
import { BntCardBody } from "shared/card/card-body";
import { BntTypography } from "shared/typography/typography";
import { BntStack } from "shared/stack/stack";
import { useAppDispatch } from "services/store/store";
import { TDonut } from "@/types/model";

export const DONUT_CARD_CLASSES = {
	cardHover: "card-hover",
	cardHeaderHover: "card-header-hover",
	cardActions: "card-actions",
	cardBody: "card-body",
	remains: "remains",
	logo: "logo",
	cardTitle: "card-title",
};

export const BntDonutCard: FC<{ donut: TDonut; className?: string }> = ({
	donut,
	className,
}) => {
	const { translate } = useBntTranslate();
	const dispatch = useAppDispatch();

	const onShowDonut = () => {
		dispatch(push(`/d/${donut.id}`));
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
							{translate("on stock")}: {on_stock}
						</div>
					)}
				</BntCardBody>
			</BntCardActionArea>
		</BntCard>
	);
};
