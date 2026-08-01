import { getFirstFiniteNumber, getFirstNonEmptyString, unwrapJsonApiAttributes } from "@/shared/lib/data";

import {
	AccountTypeFilter,
	type IAccountOperation,
	type IAccountOperationApiItem,
	type IAccountOperationGroup,
	type IAccountOperationsSummary,
	type IAccountOperationsSummaryApi,
	OperationPeriod,
	OperationTypeFilter,
} from "./account-operations-types";

const getNumber = (record: Record<string, unknown>, keys: string[]): number => getFirstFiniteNumber(record, keys) ?? 0;

const resolveAccountType = (record: IAccountOperationApiItem): AccountTypeFilter.coin | AccountTypeFilter.donut => {
	const accountType = getFirstNonEmptyString(record, ["account_type", "currency", "account"]);

	return accountType === AccountTypeFilter.donut || accountType === "donut" ? AccountTypeFilter.donut : AccountTypeFilter.coin;
};

const resolveOperationType = (record: IAccountOperationApiItem): OperationTypeFilter => {
	const operationType = getFirstNonEmptyString(record, ["operation_type", "kind", "type"]);

	if (operationType === OperationTypeFilter.purchase) return OperationTypeFilter.purchase;
	if (operationType === OperationTypeFilter.refund || operationType === "rollback") return OperationTypeFilter.refund;
	if (operationType === OperationTypeFilter.recognition || operationType === "recognition") return OperationTypeFilter.recognition;

	return OperationTypeFilter.all;
};

const resolveSignedAmount = (record: IAccountOperationApiItem, operationType: OperationTypeFilter): number => {
	const amount = getNumber(record, ["amount", "value"]);
	const direction = getNumber(record, ["direction"]);

	if (amount < 0) return amount;
	if (direction < 0 || operationType === OperationTypeFilter.purchase) return -amount;

	return amount;
};

export const presentAccountOperations = (data: unknown): IAccountOperation[] => {
	if (!Array.isArray(data)) return [];

	return data.map((source, index) => {
		const item = unwrapJsonApiAttributes(source as IAccountOperationApiItem);
		const operationType = resolveOperationType(item);
		const profile = item.profile && typeof item.profile === "object" ? item.profile : undefined;
		const title = getFirstNonEmptyString(item, ["title", "name", "comment"]) || profile?.name || "—";

		return {
			accountType: resolveAccountType(item),
			amount: resolveSignedAmount(item, operationType),
			createdAt: getFirstNonEmptyString(item, ["created_at_utc", "created_at", "date"]) || new Date(0).toISOString(),
			description: getFirstNonEmptyString(item, ["description", "subtitle", "details"]),
			id: String(item.id ?? index),
			operationType,
			status: getFirstNonEmptyString(item, ["status"]),
			title,
		};
	});
};

export const presentAccountOperationsSummary = (data: unknown, operations: IAccountOperation[]): IAccountOperationsSummary => {
	const summary = data && typeof data === "object" ? (data as IAccountOperationsSummaryApi) : {};
	const calculatedSpent = operations.filter((item) => item.accountType === AccountTypeFilter.coin && item.amount < 0).reduce((total, item) => total + Math.abs(item.amount), 0);
	const calculatedReturned = operations
		.filter((item) => item.operationType === OperationTypeFilter.refund && item.accountType === AccountTypeFilter.coin)
		.reduce((total, item) => total + Math.abs(item.amount), 0);
	const calculatedReceived = operations.filter((item) => item.accountType === AccountTypeFilter.donut && item.amount > 0).reduce((total, item) => total + item.amount, 0);

	return {
		coinOperationsCount: getFirstFiniteNumber(summary, ["coin_operations_count", "coins_operations_count", "self_operations_count"]),
		donutOperationsCount: getFirstFiniteNumber(summary, ["donut_operations_count", "donuts_operations_count", "distrib_operations_count"]),
		operationsCount: getFirstFiniteNumber(summary, ["operations_count", "total_count", "count"]) ?? operations.length,
		purchasesCount: getNumber(summary, ["purchases_count", "purchase_count"]),
		receivedDonuts: getFirstFiniteNumber(summary, ["received_donuts", "donuts_received", "received_distrib"]) ?? calculatedReceived,
		returnedCoins: getFirstFiniteNumber(summary, ["returned_coins", "refunded_coins", "coins_returned"]) ?? calculatedReturned,
		spentCoins: getFirstFiniteNumber(summary, ["spent_coins", "coins_spent", "spent_self"]) ?? calculatedSpent,
	};
};

export const getOperationPeriodDates = (period: OperationPeriod, now = new Date()): { dateFrom?: string; dateTo?: string } => {
	if (period === OperationPeriod.allTime) return {};

	const from = new Date(now);
	from.setHours(0, 0, 0, 0);

	if (period === OperationPeriod.thirtyDays) from.setDate(from.getDate() - 30);
	if (period === OperationPeriod.threeMonths) from.setMonth(from.getMonth() - 3);
	if (period === OperationPeriod.year) from.setMonth(0, 1);

	return {
		dateFrom: from.toISOString(),
		dateTo: now.toISOString(),
	};
};

export const groupAccountOperations = (operations: IAccountOperation[], locale: string): IAccountOperationGroup[] => {
	const groups = new Map<string, IAccountOperationGroup>();

	operations.forEach((operation) => {
		const date = new Date(operation.createdAt);
		const validDate = Number.isNaN(date.getTime()) ? new Date(0) : date;
		const key = `${validDate.getFullYear()}-${String(validDate.getMonth() + 1).padStart(2, "0")}`;
		const label = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(validDate);
		const existingGroup = groups.get(key) || { coinTotal: 0, donutTotal: 0, items: [], key, label };

		existingGroup.items.push(operation);
		if (operation.accountType === AccountTypeFilter.coin) existingGroup.coinTotal += operation.amount;
		if (operation.accountType === AccountTypeFilter.donut) existingGroup.donutTotal += operation.amount;
		groups.set(key, existingGroup);
	});

	return Array.from(groups.values()).sort((left, right) => right.key.localeCompare(left.key));
};
