import { FC } from "react";
import { BntCard } from "shared/card/card";
import classNames from "classnames";
import { BntCardActionArea } from "shared/card/card-action-area";
import { BntCardBody } from "shared/card/card-body";
import { BntStack } from "shared/stack/stack";
import { BntTypography } from "shared/typography/typography";
import { emptyFunction } from "utils/empty-function";
import { EMPLOYEE_CARD_CLASSES } from "components/employee/employee-card/classes";
import { DEFAULT_AVATAR } from "constants/images";
import { TProfile } from "@/types/model";

export type EmployeeCardPureProps = {
	employee: TProfile;
	onCardClick?: VoidFunction;
	className?: string;
};
export const EmployeeCardPure: FC<EmployeeCardPureProps> = ({
	employee,
	onCardClick = emptyFunction,
	className,
}) => {
	const { user_avatar, name } = employee;
	return (
		<BntCard raised className={classNames(EMPLOYEE_CARD_CLASSES.employeeCard, className)}>
			<BntCardActionArea onClick={onCardClick} className={EMPLOYEE_CARD_CLASSES.cardActions}>
				<BntCardBody className={`${EMPLOYEE_CARD_CLASSES.cardBody} m-10`}>
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
							<BntTypography variant="body1">{name}</BntTypography>
						</div>
					</BntStack>
				</BntCardBody>
			</BntCardActionArea>
		</BntCard>
	);
};
