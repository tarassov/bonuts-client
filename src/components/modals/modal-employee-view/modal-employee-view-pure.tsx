import { FC } from "react";
import { BntStack } from "shared/stack/stack";
import { ImagePreview } from "shared/image/image-preview";
import { DEFAULT_AVATAR } from "constants/images";
import { BntTypography } from "shared/typography/typography";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { CircularProgress, Stack } from "@mui/material";
import * as React from "react";

import { BntRoundButton } from "shared/buttons/round-button";
import { BntChip } from "shared/chip/chip";
import { texts_m } from "@/services/localization/texts/texts_m";
import { TProfile } from "@/types/model";

export type ModalEmployeeViewPureProps = {
	employee?: TProfile;
	onGoToEmployeeClick: VoidFunction;
	isLoading?: boolean;
	className?: string;
};
export const ModalEmployeeViewPure: FC<ModalEmployeeViewPureProps> = ({
	employee,
	onGoToEmployeeClick,
	isLoading,
	className,
}) => {
	const { t } = useBntTranslate();
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
									{t(texts_m.more)}...
								</BntRoundButton>
							</BntStack>

							<Stack
								direction={{ sm: "column", md: "row", xs: "row" }}
								justifyContent="center"
								alignItems={{ sm: "center", xs: "center" }}
								spacing={2}
								className="ml-4 mt-4"
							>
								{employee?.circles?.map((circle) => {
									return <BntChip color="info" label={circle.name} />;
								})}
							</Stack>
						</BntStack>
					</BntStack>
				</>
			)}
		</BntStack>
	);
};
