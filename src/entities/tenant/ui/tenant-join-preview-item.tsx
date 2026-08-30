import type { FC } from "react";
import { memo } from "react";

import { JoinButton, TenantDescription, TenantDetails, TenantItemRoot, TenantLogo, TenantTitle } from "./tenant-join-preview-item.styles";
import type { TTenant } from "@/types/model/tenant";

interface ITenantJoinPreviewItemProps {
	actionLabel: string;
	description: string;
	isJoining: boolean;
	onJoin: VoidFunction;
	tenant: TTenant;
}

const TenantJoinPreviewItemComponent: FC<ITenantJoinPreviewItemProps> = ({ actionLabel, description, isJoining, onJoin, tenant }) => {
	const logoUrl = tenant.logo?.thumb?.url || tenant.logo?.url;
	const title = tenant.caption || tenant.name;

	return (
		<TenantItemRoot>
			<TenantLogo aria-label={title}>{logoUrl ? <img src={logoUrl} alt={title} /> : title.slice(0, 2).toUpperCase()}</TenantLogo>
			<TenantDetails>
				<TenantTitle>{title}</TenantTitle>
				<TenantDescription>{description}</TenantDescription>
			</TenantDetails>
			<JoinButton disabled={isJoining} noTransform onClick={onJoin} variant="contained">
				{actionLabel}
			</JoinButton>
		</TenantItemRoot>
	);
};

export const TenantJoinPreviewItem = memo(TenantJoinPreviewItemComponent);
