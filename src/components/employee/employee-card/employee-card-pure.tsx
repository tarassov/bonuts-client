import React, { FC } from "react";
import { BntCard } from "shared/ui/card/card";
import classNames from "classnames";
import { BntCardActionArea } from "shared/ui/card/card-action-area";
import { BntCardBody } from "shared/ui/card/card-body";
import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";
import { emptyFunction } from "utils/empty-function";
import { EMPLOYEE_CARD_CLASSES } from "components/employee/employee-card/classes";
import { DEFAULT_AVATAR } from "constants/images";
import { texts_t } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { CakeOutlined } from "@mui/icons-material";
import { BntIconButton } from "shared/ui/icon-button/bnt-icon-button";
import { TProfile } from "@/types/model";

export type EmployeeCardPureProps = {
	employee: TProfile;
	onCardClick?: VoidFunction;
	onTransferClick?: VoidFunction;
	className?: string;
};
export const EmployeeCardPure: FC<EmployeeCardPureProps> = ({
	employee,
	onCardClick = emptyFunction,
	className,
	onTransferClick = emptyFunction,
}) => {
	const { user_avatar, name } = employee;
	const { translate } = useBntTranslate();

	return (
		<BntCard raised className={classNames(className)}>
			<BntCardActionArea onClick={onCardClick} className={EMPLOYEE_CARD_CLASSES.cardActions}>
				<BntCardBody className={`${EMPLOYEE_CARD_CLASSES.cardBody} mt-4 ml-10 mr-10 mb-4`}>
					<BntStack
						direction="column"
						justifyContent="space-between"
						alignItems="center"
						spacing={3}
					>
						<div className={EMPLOYEE_CARD_CLASSES.userPic}>
							<img src={user_avatar?.url || DEFAULT_AVATAR} alt="..." />
						</div>
						<div className={EMPLOYEE_CARD_CLASSES.captions}>
							<BntStack direction="row" alignItems="center">
								<BntTypography variant="body1" className="pt-1">
									{name}
								</BntTypography>
								<BntIconButton
									color="primary"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										onTransferClick();
									}}
									tooltip={translate(texts_t.transfer_donuts, { capitalize: true })}
								>
									<CakeOutlined />
								</BntIconButton>
							</BntStack>
						</div>
					</BntStack>
				</BntCardBody>
			</BntCardActionArea>
		</BntCard>
	);
};
