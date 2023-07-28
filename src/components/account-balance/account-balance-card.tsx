import { GradientCard } from "shared/card/gradient-card";
import { FC } from "react";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { AccountBalanceDistrib } from "components/account-balance/account-balance-distrib";
import { AccountBalanceSelf } from "components/account-balance/account-balance-self";

export const AccountBalanceCard: FC<{ accountType: "self" | "distrib" }> = ({ accountType }) => {
	const { profile } = useProfileLogic();
	if (!profile) return null;
	return (
		<GradientCard sx={{ maxWidth: "300px" }} className="p-2">
			{accountType === "distrib" ? (
				<AccountBalanceDistrib profile={profile} />
			) : (
				<AccountBalanceSelf profile={profile} />
			)}
		</GradientCard>
	);
};
