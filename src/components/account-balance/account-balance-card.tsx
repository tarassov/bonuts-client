import { FC } from "react";

import { AccountBalanceDistrib } from "components/account-balance/account-balance-distrib";
import { AccountBalanceSelf } from "components/account-balance/account-balance-self";

import { GradientCard } from "@/shared/ui/card";

import { useProfile } from "@/entities/profile";

export const AccountBalanceCard: FC<{ accountType: "self" | "distrib" }> = ({ accountType }) => {
	const { profile } = useProfile();

	if (!profile) return null;

	return (
		<GradientCard className="p-2 width-100" sx={{ maxWidth: 700 }} secondary>
			{accountType === "distrib" ? <AccountBalanceDistrib profile={profile} /> : <AccountBalanceSelf profile={profile} />}
		</GradientCard>
	);
};
