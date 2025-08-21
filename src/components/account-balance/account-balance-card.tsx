import { FC } from "react";

import { GradientCard } from "shared/ui/card/gradient-card";

import { AccountBalanceDistrib } from "components/account-balance/account-balance-distrib";
import { AccountBalanceSelf } from "components/account-balance/account-balance-self";

import { useProfileLogic } from "@/entities/profile";

export const AccountBalanceCard: FC<{ accountType: "self" | "distrib" }> = ({ accountType }) => {
	const { profile } = useProfileLogic();
	if (!profile) return null;
	return (
		<GradientCard className="p-2 width-100" sx={{ maxWidth: 700 }}>
			{accountType === "distrib" ? (
				<AccountBalanceDistrib profile={profile} />
			) : (
				<AccountBalanceSelf profile={profile} />
			)}
		</GradientCard>
	);
};
