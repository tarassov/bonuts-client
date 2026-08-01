/**
 * Identifiers of a profile's accounts as accepted by the API.
 *
 * @example
 * useGetAccountOperationsHistoryQuery({ accountType: AccountType.distrib, profileId, tenant });
 */
export enum AccountType {
	self = "self",
	distrib = "distrib",
}
