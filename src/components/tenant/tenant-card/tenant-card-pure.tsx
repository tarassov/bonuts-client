import { BntCard } from "shared/ui/card/card";
import classNames from "classnames";
import { BntCardBody } from "shared/ui/card/card-body";
import { BntStack } from "shared/ui/stack/stack";
import { DEFAULT_DONUT_IMAGE } from "constants/images";
import { BntTypography } from "shared/ui/typography/typography";
import { FC } from "react";
import { TENANT_CARD_CLASSES } from "components/tenant/tenant-card/classes";
import { BntRegularSecondaryButton } from "shared/ui/buttons/regular-secondary-button";
import { emptyFunction } from "utils/empty-function";
import { BntCancelButton } from "shared/ui/buttons/cancel-button";
import { TTenant } from "@/types/model/tenant";

export type TenantCardPureProps = {
	tenant: Partial<Pick<TTenant, "logo" | "caption">>;
	submitActionName?: string;
	onSubmitActionClick?: VoidFunction;
	cancelActionName?: string;
	onCancelActionClick?: VoidFunction;
	className?: string;
	errorText?: string;
};

export const TenantCardPure: FC<TenantCardPureProps> = ({
	tenant,
	submitActionName,
	onSubmitActionClick = emptyFunction,
	cancelActionName,
	onCancelActionClick = emptyFunction,
	className,
	errorText,
}) => {
	const { logo, caption } = tenant;
	return (
		<BntCard raised className={classNames(TENANT_CARD_CLASSES.tenantCard, className)}>
			<BntCardBody className={`${TENANT_CARD_CLASSES.cardBody} mt-4 ml-4 mr-4 mb-4`}>
				<BntStack direction="column" justifyContent="space-between" alignItems="center" spacing={3}>
					<div
						className={classNames(TENANT_CARD_CLASSES.tenantDefaultLogo, {
							[TENANT_CARD_CLASSES.tenantLogo]: logo?.url,
						})}
					>
						<img src={logo?.url || DEFAULT_DONUT_IMAGE} alt="..." />
					</div>
					<div className={TENANT_CARD_CLASSES.captions}>
						<BntTypography align="center" variant="subtitle1">
							{caption}
						</BntTypography>
						<BntTypography className={TENANT_CARD_CLASSES.error} align="center" variant="caption">
							{errorText}
						</BntTypography>
					</div>
				</BntStack>
			</BntCardBody>
			<BntStack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={3}
				className="mb-6"
			>
				{submitActionName && (
					<BntRegularSecondaryButton variant="contained" onClick={onSubmitActionClick} noTransform>
						{submitActionName}
					</BntRegularSecondaryButton>
				)}
				{cancelActionName && (
					<BntCancelButton variant="contained" onClick={onCancelActionClick} noTransform>
						{cancelActionName}
					</BntCancelButton>
				)}
			</BntStack>
		</BntCard>
	);
};
