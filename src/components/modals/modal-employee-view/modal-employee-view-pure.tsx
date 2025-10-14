import { FC } from "react";
import * as React from "react";
import { MoreHoriz } from "@mui/icons-material";
import { CircularProgress, Tooltip, useMediaQuery, useTheme } from "@mui/material";

import { BntRoundButton } from "shared/ui/buttons/round-button";
import { ImagePreview } from "shared/ui/image/image-preview";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { DEFAULT_AVATAR } from "constants/images";

import { texts_g } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { CircleTag } from "components/circle/circle-tag/circle-tag";

import { TProfile } from "@/types/model";

export type ModalEmployeeViewPureProps = {
	employee?: TProfile;
	onGoToEmployeeClick: VoidFunction;
	isLoading?: boolean;
	className?: string;
};

const MAX_TAGS = 3;
export const ModalEmployeeViewPure: FC<ModalEmployeeViewPureProps> = ({
	employee,
	onGoToEmployeeClick,
	isLoading,
	className,
}) => {
	const { t } = useBntTranslate();
	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<BntStack flexDirection="row" className={className}>
			{isLoading ? (
				<CircularProgress color="inherit" />
			) : (
				<>
					<ImagePreview defaultImage={employee?.user_avatar?.url || DEFAULT_AVATAR} />
					<BntStack flexDirection="column" justifyContent="space-between" sx={{ width: "100%" }}>
						<BntStack flexDirection="column" gap={2}>
							<BntTypography variant="h4">{employee?.name}</BntTypography>
							<BntStack flexDirection="row" alignItems="baseline">
								<BntTypography>{employee?.position}</BntTypography>
								<BntRoundButton variant="outlined" onClick={onGoToEmployeeClick} className="ml-2">
									{t(texts_g.go_to)}
								</BntRoundButton>
							</BntStack>

							<BntStack
								direction="row"
								justifyContent="center"
								alignItems={{ sm: "center", xs: "center" }}
								flexWrap="wrap"
								spacing={1}
								gap={1}
								className="ml-2 mt-2"
							>
								{employee?.circles
									?.filter((x, i) => i < MAX_TAGS || !matchesDownSm)
									.map((circle) => {
										return <CircleTag title={circle.name} />;
									})}
								{matchesDownSm && employee?.circles?.length && employee?.circles?.length > MAX_TAGS ? (
									<Tooltip
										title={employee.circles
											.filter((x, i) => i >= MAX_TAGS)
											.map((x) => x.name)
											.join(", ")}
									>
										<MoreHoriz className="pointer" onClick={onGoToEmployeeClick} />
									</Tooltip>
								) : null}
							</BntStack>
						</BntStack>
					</BntStack>
				</>
			)}
		</BntStack>
	);
};
