import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useBonutsIcon } from "hooks/use-bonuts-icon";
import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { texts_i, texts_t } from "services/localization/texts";
import { AccountBallanceMainInfo } from "components/account-balance/account-ballance-main-info";
import { BntRoundButton } from "shared/buttons/round-button";
import Box from "@mui/material/Box/Box";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { TProfile } from "@/types/model";
import { BntStack } from "@/shared/stack/stack";

export const AccountBalanceSelf: FC<{ profile: TProfile }> = ({ profile }) => {
	const { t } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();
	const accountId = profile?.self_account?.id;
	const { account, isLoading } = useAccountBalanceLoader(accountId);
	const { toStore } = useDonutUi();
	const { toSelfBalanceHistory } = useEmployeeUi(profile);

	return (
		<BntStack gap={1}>
			<AccountBallanceMainInfo
				title={t(texts_i.i_can_spend, { capitalize: true })}
				balance={account?.balance}
				value={
					isLoading ? (
						"..."
					) : (
						<>
							{t("point", { count: account?.balance })}
							(<BonutsCurrency />)
						</>
					)
				}
				lastOperation={account?.last_operation}
				onClick={toSelfBalanceHistory}
			/>
			<Box>
				<BntRoundButton variant="contained" onClick={toStore}>
					{t(texts_t.to_store, { capitalize: true })}
				</BntRoundButton>
			</Box>
		</BntStack>
	);
};
