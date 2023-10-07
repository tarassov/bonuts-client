import { BntCard } from "shared/card/card";
import classNames from "classnames";
import { BntCardBody } from "shared/card/card-body";
import { BntStack } from "shared/stack/stack";
import { DEFAULT_DONUT_IMAGE } from "constants/images";
import { BntTypography } from "shared/typography/typography";
import { FC } from "react";
import { TENANT_CARD_CLASSES } from "components/tenant/tenant-card/classes";
import { BntRegularSecondaryButton } from "shared/buttons/regular-secondary-button";
import { TTenant } from "@/types/model/tenant";

export type TenantCardPureProps = {
	tenant: TTenant;
	actionName?: string;
	onActionClick?: VoidFunction;
	className?: string;
};

export const TenantCardPure: FC<TenantCardPureProps> = ({
	tenant,
	actionName,
	onActionClick,
	className,
}) => {
	const { logo, caption } = tenant;
	return (
		<BntCard raised className={classNames(TENANT_CARD_CLASSES.tenantCard, className)}>
			<BntCardBody className={`${TENANT_CARD_CLASSES.cardBody} mt-10 ml-10 mr-10 mb-4`}>
				<BntStack direction="column" justifyContent="space-between" alignItems="center" spacing={3}>
					<div className={TENANT_CARD_CLASSES.tenantLogo}>
						<img src={logo?.url || DEFAULT_DONUT_IMAGE} alt="..." />
					</div>
					<div className={TENANT_CARD_CLASSES.captions}>
						<BntTypography align="center" variant="subtitle1">
							{caption}
						</BntTypography>
					</div>
				</BntStack>
			</BntCardBody>
			{actionName && (
				<BntStack
					direction="column"
					justifyContent="space-between"
					alignItems="center"
					spacing={3}
					className="mb-6"
				>
					<BntRegularSecondaryButton variant="contained" onClick={onActionClick}>
						{actionName}
					</BntRegularSecondaryButton>
				</BntStack>
			)}
		</BntCard>
	);
};
