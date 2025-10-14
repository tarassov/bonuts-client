import { FC } from "react";

import { BntBox } from "shared/ui/box/bnt-box";
import { BntRoundButton } from "shared/ui/buttons/round-button";
import { BntStack } from "shared/ui/stack";

import { texts_i, texts_t } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { useBonutsIcon } from "hooks/use-bonuts-icon";

import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { useEmployeeUi } from "logic/ui/use-employee-ui";

import { AccountBalanceMainInfo } from "components/account-balance/account-balance-main-info";

import { TProfile } from "@/types/model";

export const AccountBalanceSelf: FC<{ profile: TProfile }> = ({ profile }) => {
	const { t } = useBntTranslate();
	const { BonutsCurrency } = useBonutsIcon();
	const accountId = profile?.self_account?.id;
	const { account, isLoading } = useAccountBalanceLoader(accountId);
	const { toStore } = useDonutUi();
	const { toSelfBalanceHistory } = useEmployeeUi(profile);

	return (
		<BntStack gap={1}>
			<AccountBalanceMainInfo
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
				name="point"
				lastOperation={account?.last_operation}
				onClick={toSelfBalanceHistory}
			/>
			<BntBox>
				<BntRoundButton variant="contained" onClick={toStore}>
					{t(texts_t.to_store, { capitalize: true })}
				</BntRoundButton>
			</BntBox>
		</BntStack>
	);
};
