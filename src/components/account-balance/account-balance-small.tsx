import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { BntStack } from "shared/ui/stack/stack";
import { BntTypography } from "shared/ui/typography/typography";
import { useBonutsIcon } from "hooks/use-bonuts-icon";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { FC } from "react";
import { DonutSmallOutlined } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import { BntBox } from "shared/ui/box/bnt-box";
import { TProfile } from "@/types/model";

export const AccountBalanceSmall: FC<{ profile?: TProfile }> = ({ profile }) => {
	const { account: distribAccount, isLoading: isLoadingDistrib } = useAccountBalanceLoader(
		profile?.distrib_account?.id
	);
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const { account: selfAccount, isLoading: isLoadingSelf } = useAccountBalanceLoader(
		profile?.self_account?.id
	);
	const { BonutsCurrency } = useBonutsIcon({ height: "16px", width: "16px" });
	const { toSelfBalanceHistory, toDistribBalanceHistory } = useEmployeeUi(profile);
	const { t } = useBntTranslate();

	return (
		<BntStack
			direction="column"
			minWidth={smallScreen ? 20 : 100}
			maxWidth={smallScreen ? 50 : 200}
		>
			<BntBox
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
						{!isLoadingSelf && profile ? (
							<>
								{!smallScreen
									? `${selfAccount?.balance} ${t("point", { count: selfAccount?.balance })}`
									: selfAccount?.balance}
							</>
						) : null}
					</BntTypography>
					<BonutsCurrency />
				</BntStack>
			</BntBox>
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
					{!isLoadingDistrib && profile ? (
						<>
							{!smallScreen
								? `${distribAccount?.balance} ${t("donut", { count: distribAccount?.balance })}`
								: distribAccount?.balance}
						</>
					) : null}
				</BntTypography>
				<DonutSmallOutlined color="primary" sx={{ width: "16px", height: "16px" }} />
			</BntStack>
		</BntStack>
	);
};
