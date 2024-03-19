import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { useBonutsIcon } from "hooks/use-bonuts-icon";
import { useAccountBalanceLoader } from "logic/hooks/account/use-account-balance-loader";
import { texts_i, texts_t } from "services/localization/texts";
import { AccountBalanceMainInfo } from "components/account-balance/account-balance-main-info";
import { BntRoundButton } from "shared/buttons/round-button";
import { useDonutUi } from "logic/ui/use-donut-ui";
import { useEmployeeUi } from "logic/ui/use-employee-ui";
import { BntBox } from "shared/box/bnt-box";
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
