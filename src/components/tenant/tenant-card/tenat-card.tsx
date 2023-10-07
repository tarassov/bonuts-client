import { FC } from "react";
import { TenantCardStyled } from "components/tenant/tenant-card/tenant-card-styled";
import { TTenant } from "@/types/model/tenant";

export type TenantCardProps = {
	tenant: TTenant;
	actionName?: string;
	onActionClick?: VoidFunction;
};
export const TenantCard: FC<TenantCardProps> = (props) => <TenantCardStyled {...props} />;
