import type { FC } from "react";
import { CakeOutlined } from "@mui/icons-material";

import { BntStack } from "@/shared/ui/stack";

import { EmployeeCardActionArea, EmployeeCardAvatar, EmployeeCardBody, EmployeeCardCaption, EmployeeCardFooter, EmployeeCardRoot, EmployeeName, EmployeeTransferButton } from "./employee-card.styled";
import { DEFAULT_AVATAR } from "@/constants/images";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useTransferUi } from "@/logic/ui/use-transfer-ui";
import { texts_g } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

type TEmployeeCardProps = {
	employee: TProfile;
};

export const EmployeeCard: FC<TEmployeeCardProps> = ({ employee }) => {
	const { user_avatar, name } = employee;
	const { showEmployee } = useEmployeeUi(employee);
	const { showTransfer } = useTransferUi();
	const { translate } = useBntTranslate();

	return (
		<EmployeeCardRoot raised>
			<EmployeeCardActionArea onClick={() => showEmployee()}>
				<EmployeeCardBody>
					<BntStack direction="column" justifyContent="space-between" alignItems="center" spacing={3}>
						<div>
							<EmployeeCardAvatar src={user_avatar?.url || DEFAULT_AVATAR} alt={name} />
						</div>
						<EmployeeCardCaption>
							<EmployeeName variant="body1">{name}</EmployeeName>
							<EmployeeCardFooter>
								<EmployeeTransferButton
									startIcon={<CakeOutlined />}
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										showTransfer(employee.id);
									}}
								>
									{translate(texts_g.give_donuts, { capitalize: true })}
								</EmployeeTransferButton>
							</EmployeeCardFooter>
						</EmployeeCardCaption>
					</BntStack>
				</EmployeeCardBody>
			</EmployeeCardActionArea>
		</EmployeeCardRoot>
	);
};
