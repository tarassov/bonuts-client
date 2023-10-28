import { FC } from "react";
import { TenantCardStyled } from "components/tenant/tenant-card/tenant-card-styled";
import { TTenant } from "@/types/model/tenant";

export type TenantCardProps = {
	tenant: Partial<Pick<TTenant, "logo" | "caption">>;
	submitActionName?: string;
	onSubmitActionClick?: VoidFunction;
	cancelActionName?: string;
	onCancelActionClick?: VoidFunction;
	errorText?: string;
};
export const TenantCard: FC<TenantCardProps> = (props) => <TenantCardStyled {...props} />;
