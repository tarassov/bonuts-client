import { useState } from "react";
import { Box } from "@mui/material";

import { AccountTypeFilter, type IAccountOperation, OperationPeriod, OperationTypeFilter } from "../model/account-operations-types";

import { AccountOperationsView } from "./account-operations-view";

const operations: IAccountOperation[] = [
	{
		accountType: AccountTypeFilter.coin,
		amount: 2,
		createdAt: "2026-07-23T20:45:00Z",
		description: "The order was cancelled by the store",
		id: "refund-1",
		operationType: OperationTypeFilter.refund,
		title: "Refund for Hoodie Bonuts",
	},
	{
		accountType: AccountTypeFilter.coin,
		amount: -10,
		createdAt: "2026-07-19T17:21:00Z",
		description: "Store · code issued",
		id: "purchase-1",
		operationType: OperationTypeFilter.purchase,
		title: "Ozon certificate",
	},
	{
		accountType: AccountTypeFilter.donut,
		amount: 1,
		createdAt: "2026-06-24T21:55:00Z",
		description: "From Pepper Potts",
		id: "recognition-1",
		operationType: OperationTypeFilter.recognition,
		title: "Donut for helping with the release",
	},
];

const meta = {
	title: "Pages/Account Operations/Account Operations Page",
	component: AccountOperationsView,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

export const Default = {
	render: () => {
		const [accountType, setAccountType] = useState(AccountTypeFilter.all);
		const [operationType, setOperationType] = useState(OperationTypeFilter.all);
		const [period, setPeriod] = useState(OperationPeriod.allTime);
		const [search, setSearch] = useState("");
		const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

		return (
			<Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
				<AccountOperationsView
					accountType={accountType}
					isFiltersExpanded={isFiltersExpanded}
					onAccountTypeChange={setAccountType}
					onBack={() => undefined}
					onFiltersToggle={() => setIsFiltersExpanded((isExpanded) => !isExpanded)}
					onOperationTypeChange={setOperationType}
					onPeriodChange={setPeriod}
					onSearchChange={setSearch}
					operationType={operationType}
					operations={operations}
					period={period}
					search={search}
					summary={{ coinOperationsCount: 12, donutOperationsCount: 6, operationsCount: 18, purchasesCount: 6, receivedDonuts: 7, returnedCoins: 29, spentCoins: 125 }}
				/>
			</Box>
		);
	},
};

export const Empty = {
	args: {
		accountType: AccountTypeFilter.all,
		isFiltersExpanded: false,
		onAccountTypeChange: () => undefined,
		onBack: () => undefined,
		onFiltersToggle: () => undefined,
		onOperationTypeChange: () => undefined,
		onPeriodChange: () => undefined,
		onSearchChange: () => undefined,
		operationType: OperationTypeFilter.all,
		operations: [],
		period: OperationPeriod.allTime,
		search: "",
		summary: { coinOperationsCount: 0, donutOperationsCount: 0, operationsCount: 0, purchasesCount: 0, receivedDonuts: 0, returnedCoins: 0, spentCoins: 0 },
	},
};
