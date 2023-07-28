import { FC } from "react";
import { BntEventList } from "components/event/event-list/event-list";
import { AccountBalanceCard } from "components/account-balance/account-balance-card";

export const DashboardPage: FC = () => {
	return (
		<>
			<AccountBalanceCard accountType="self" />
			<AccountBalanceCard accountType="distrib" />
			<BntEventList />
		</>
	);
};
