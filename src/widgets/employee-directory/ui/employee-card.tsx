import type { FC } from "react";
import { CakeOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { BntCard } from "@/shared/ui/card/card";
import { BntCardActionArea } from "@/shared/ui/card/card-action-area";
import { BntCardBody } from "@/shared/ui/card/card-body";
import { BntIconButton } from "@/shared/ui/icon-button/bnt-icon-button";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography/typography";

import { DEFAULT_AVATAR } from "@/constants/images";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useTransferUi } from "@/logic/ui/use-transfer-ui";
import { texts_t } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

const EmployeeCardRoot = styled(BntCard)(({ theme }) => {
	return {
		backgroundColor: theme.palette.secondary.veryLight,
		maxWidth: 300,
		color: theme.palette.neutral.dark,
		margin: "auto",
		"&:hover": {
			outline: "2px solid",
			outlineColor: theme.palette.primary.light,
		},
	};
});

const EmployeeCardActionArea = styled(BntCardActionArea)({
	width: "100%",
});

const EmployeeCardBody = styled(BntCardBody)({
	display: "flex",
	justifyContent: "center",
	minHeight: 200,
	padding: "16px 40px",
});

const EmployeeCardAvatar = styled("img")(({ theme }) => {
	return {
		width: "auto",
		height: "auto",
		maxHeight: "160px",
		maxWidth: "100%",
		verticalAlign: "middle",
		margin: "0 auto",
		border: 0,
		boxShadow: "0px 0px 48px rgba(255, 255, 255, 0.8)",
		transition: "transform 500ms cubic-bezier(0.34, 1.61, 0.7, 1)",
		[theme.breakpoints.down("sm")]: {
			maxHeight: "90px",
		},
		[`${EmployeeCardRoot}:hover &`]: {
			transform: "translate3d(0, -3px, 2px)",
		},
	};
});

const EmployeeCardCaption = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	alignItems: "center",
});

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
							<BntStack direction="row" alignItems="center">
								<BntTypography variant="body1">{name}</BntTypography>
								<BntIconButton
									color="primary"
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										showTransfer(employee.id);
									}}
									tooltip={translate(texts_t.transfer_donuts, { capitalize: true })}
								>
									<CakeOutlined />
								</BntIconButton>
							</BntStack>
						</EmployeeCardCaption>
					</BntStack>
				</EmployeeCardBody>
			</EmployeeCardActionArea>
		</EmployeeCardRoot>
	);
};
