import {
	AccountTypeFilter,
	type IAccountOperation,
	type IAccountOperationGroup,
	type IAccountOperationsSummary,
	OperationPeriod,
	OperationTypeFilter,
	PurchaseRequestStatus,
	type TAccountOperationApiItem,
	type TAccountOperationPurchase,
	type TAccountOperationsSummaryApi,
} from "./account-operations-types";

const accountTypeByApiValue: Record<TAccountOperationApiItem["account_type"], AccountTypeFilter.coin | AccountTypeFilter.donut> = {
	self: AccountTypeFilter.coin,
	distrib: AccountTypeFilter.donut,
};

// `other` operations have no dedicated filter, so they are presented with the neutral icon of the `all` tab.
const operationTypeByApiValue: Record<TAccountOperationApiItem["operation_type"], OperationTypeFilter> = {
	purchase: OperationTypeFilter.purchase,
	refund: OperationTypeFilter.refund,
	transfer: OperationTypeFilter.recognition,
	other: OperationTypeFilter.all,
};

const purchaseStatusByApiValue: Record<TAccountOperationPurchase["status"], PurchaseRequestStatus> = {
	0: PurchaseRequestStatus.new,
	1: PurchaseRequestStatus.processing,
	2: PurchaseRequestStatus.received,
};

const presentProduct = (purchase: TAccountOperationApiItem["purchase"]): IAccountOperation["product"] => {
	if (!purchase?.product_name) return undefined;

	return { id: purchase.product_id, name: purchase.product_name };
};

export const presentAccountOperations = (data: TAccountOperationApiItem[] = []): IAccountOperation[] =>
	data.map((item) => {
		const product = presentProduct(item.purchase);

		return {
			accountType: accountTypeByApiValue[item.account_type],
			amount: item.amount * item.direction,
			createdAt: item.created_at,
			description: item.comment || undefined,
			profile: (item.direction === 1 ? item.from_profile : item.to_profile) || undefined,
			id: item.id,
			operationType: operationTypeByApiValue[item.operation_type],
			product,
			purchaseStatus: item.purchase ? purchaseStatusByApiValue[item.purchase.status] : undefined,
			title: product?.name || item.comment || item.from_profile?.name || "—",
			direction: item.direction,
		};
	});

export const presentAccountOperationsSummary = (data?: TAccountOperationsSummaryApi): IAccountOperationsSummary => ({
	// The endpoint counts every kind of operation separately, so the total is their sum.
	operationsCount: (data?.purchases_count ?? 0) + (data?.refunds_count ?? 0) + (data?.received_from_colleagues_count ?? 0),
	purchasesCount: data?.purchases_count ?? 0,
	receivedDonuts: data?.received_from_colleagues ?? 0,
	returnedCoins: data?.refunded ?? 0,
	spentCoins: data?.spent ?? 0,
});

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
