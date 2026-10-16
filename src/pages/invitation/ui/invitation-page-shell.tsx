import type { PropsWithChildren } from "react";

import { InvitationPageRoot } from "./invitation-page.styles";
import { InvitationPageBreadcrumbs } from "./invitation-page-breadcrumbs";
import styles from "./invitation-page-shell.module.scss";

type TInvitationPageShellVariant = "root" | "all";

interface IInvitationPageShellProps extends PropsWithChildren {
	variant: TInvitationPageShellVariant;
}

const shellClassNameByVariant: Record<TInvitationPageShellVariant, string> = {
	all: styles.shellCompact,
	root: styles.shellDefault,
};

export function InvitationPageShell({ children, variant }: IInvitationPageShellProps) {
	return (
		<InvitationPageRoot>
			<div className={`${styles.shell} ${shellClassNameByVariant[variant]}`}>
				<InvitationPageBreadcrumbs variant={variant} />
				{children}
			</div>
		</InvitationPageRoot>
	);
}
