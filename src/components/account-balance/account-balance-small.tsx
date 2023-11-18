import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { BntStack } from "shared/stack/stack";
import { BntTypography } from "shared/typography/typography";
import { useBonutsIcon } from "hooks/use-bonuts-icon";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { FC } from "react";
import { DonutSmallOutlined } from "@mui/icons-material";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TProfile } from "@/types/model";

export const AccountBalanceSmall: FC<{ profile?: TProfile }> = ({ profile }) => {
	const { account: distribAccount } = useAccountBalanceLoader(profile?.distrib_account?.id);
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const { account: selfAccount } = useAccountBalanceLoader(profile?.self_account?.id);
	const { BonutsCurrency } = useBonutsIcon({ height: "16px", width: "16px" });
	const { toSelfBalanceHistory, toDistribBalanceHistory } = useEmployeeUi(profile);
	const { t } = useBntTranslate();

	return (
		<BntStack
			direction="column"
			minWidth={smallScreen ? 20 : 100}
			maxWidth={smallScreen ? 50 : 200}
		>
			<Box
				color="grey.400"
				sx={{ lineHeight: "16px", borderBottom: "1px solid" }}
				className="pr-1 pointer"
				onClick={toSelfBalanceHistory}
			>
				<BntStack
					sx={{ lineHeight: "16px" }}
					direction="row"
					gap={1}
					alignItems="center"
					justifyContent="flex-end"
				>
					<BntTypography
						variant="caption"
						color="grey.700"
						sx={{ lineHeight: "22px", textWrap: "nowrap" }}
					>
						{!smallScreen
							? `${selfAccount?.balance} ${t("point", { count: selfAccount?.balance })}`
							: selfAccount?.balance}
					</BntTypography>
					<BonutsCurrency />
				</BntStack>
			</Box>
			<BntStack
				className="pr-1 pointer"
				sx={{ lineHeight: "16px" }}
				direction="row"
				gap={1}
				alignItems="center"
				justifyContent="flex-end"
				onClick={toDistribBalanceHistory}
			>
				<BntTypography
					variant="caption"
					color="grey.700"
					sx={{ lineHeight: "22px", textWrap: "nowrap" }}
				>
					{!smallScreen
						? `${distribAccount?.balance} ${t("donut", { count: distribAccount?.balance })}`
						: distribAccount?.balance}
				</BntTypography>
				<DonutSmallOutlined color="primary" sx={{ width: "16px", height: "16px" }} />
			</BntStack>
		</BntStack>
	);
};
