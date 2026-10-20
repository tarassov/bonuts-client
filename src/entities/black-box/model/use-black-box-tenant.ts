import { authTenantSelector } from "@/shared/model/auth";

import { useAppSelector } from "@/services/redux/store/store";

/** Every black box request carries the signed-in tenant; queries wait while it is unknown. */
export const useBlackBoxTenant = (): string => useAppSelector(authTenantSelector) ?? "";
