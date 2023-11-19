import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { texts_i, texts_s } from "services/localization/texts";
import { DonutSmallOutlined } from "@mui/icons-material";
import { AccountBalanceMainInfo } from "components/account-balance/account-balance-main-info";
import { BntRoundButton } from "shared/buttons/round-button";
import { BntStack } from "shared/stack/stack";
import { Box } from "@mui/material";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { TProfile } from "@/types/model";

export const AccountBalanceDistrib: FC<{ profile: TProfile }> = ({ profile }) => {
	const { t } = useBntTranslate();
	const accountId = profile?.distrib_account?.id;
	const { account, isLoading } = useAccountBalanceLoader(accountId);
	const { toEmployeeList, toDistribBalanceHistory } = useEmployeeUi(profile);

	return (
		<BntStack gap={1}>
			<AccountBalanceMainInfo
				title={t(texts_i.i_can_share, { capitalize: true })}
				balance={account?.balance}
				value={
					isLoading ? (
						"..."
					) : (
						<>
							{t("donut", { count: account?.balance })}
							(<DonutSmallOutlined color="primary" />)
						</>
					)
				}
				name="donut"
				lastOperation={account?.last_operation}
				onClick={toDistribBalanceHistory}
			/>
			<Box>
				<BntRoundButton variant="contained" onClick={toEmployeeList}>
					{t(texts_s.share, { capitalize: true })}
				</BntRoundButton>
			</Box>
		</BntStack>
	);
};
