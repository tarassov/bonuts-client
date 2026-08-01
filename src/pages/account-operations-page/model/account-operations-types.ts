import { AccountType } from "@/entities/account";

export enum AccountTypeFilter {
	all = "all",
	coin = AccountType.self,
	donut = AccountType.distrib,
}

export enum OperationTypeFilter {
	all = "all",
	purchase = "purchase",
	refund = "refund",
	recognition = "transfer",
}

export enum OperationPeriod {
	thirtyDays = "30-days",
	threeMonths = "3-months",
	year = "year",
	allTime = "all-time",
}

export interface IAccountOperationApiItem {
	account_type?: string;
	amount?: number | string;
	created_at?: string;
	created_at_utc?: string;
	description?: string;
	direction?: number | string;
	id?: number | string;
	operation_type?: string;
	profile?: {
		name?: string;
	};
	status?: string;
	subtitle?: string;
	title?: string;
	[key: string]: unknown;
}

export interface IAccountOperationsSummaryApi {
	operations_count?: number;
	purchases_count?: number;
	received_donuts?: number;
	refunded_coins?: number;
	returned_coins?: number;
	spent_coins?: number;
	[key: string]: unknown;
}

export interface IAccountOperation {
	accountType: AccountTypeFilter.coin | AccountTypeFilter.donut;
	amount: number;
	createdAt: string;
	description?: string;
	id: string;
	operationType: OperationTypeFilter;
	status?: string;
	title: string;
}

export interface IAccountOperationsSummary {
	coinOperationsCount?: number;
	donutOperationsCount?: number;
	operationsCount: number;
	purchasesCount: number;
	receivedDonuts: number;
	returnedCoins: number;
	spentCoins: number;
}

export interface IAccountOperationGroup {
	donutTotal: number;
	coinTotal: number;
	items: IAccountOperation[];
	key: string;
	label: string;
}
