import { AccountType } from "@/entities/account";

import type { GetAccountOperationsHistoryApiResponse, GetAccountOperationsSummaryApiResponse } from "@/services/api/bonuts-api";

/** Operation as returned by `/account_operations/history`. */
export type TAccountOperationApiItem = GetAccountOperationsHistoryApiResponse["data"][number];

/** Summary as returned by `/account_operations/summary`. */
export type TAccountOperationsSummaryApi = GetAccountOperationsSummaryApiResponse["data"];

export type TAccountOperationProfile = NonNullable<TAccountOperationApiItem["from_profile"]>;

export type TAccountOperationPurchase = NonNullable<TAccountOperationApiItem["purchase"]>;

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

export enum PurchaseRequestStatus {
	new = 0,
	processing = 1,
	received = 2,
}

/** Names of the filters kept in the search string of the account operations page. */
export enum AccountOperationsSearchParam {
	accountType = "accountType",
	operationType = "operationType",
	period = "period",
}

export enum OperationPeriod {
	thirtyDays = "30-days",
	threeMonths = "3-months",
	year = "year",
	allTime = "all-time",
}

export interface IAccountOperation {
	accountType: AccountTypeFilter.coin | AccountTypeFilter.donut;
	/** Signed by the direction of the operation: negative for spendings, positive for income. */
	amount: number;
	createdAt: string;
	description?: string;
	profile?: TAccountOperationProfile;
	id: number;
	operationType: OperationTypeFilter;
	purchaseStatus?: PurchaseRequestStatus;
	product?: {
		id: number;
		name: string;
	};
	title: string;
	direction?: 1 | -1;
}

export interface IAccountOperationsSummary {
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
