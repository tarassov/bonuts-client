import { FC } from "react";
import { TenantCard } from "components/tenant/tenant-card/tenat-card";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_d } from "services/localization/texts";
import { useInvitation } from "logic/hooks/invitation/use-invitation";
import { TInvitation } from "@/types/model/inivtation";

export const InvitationCard: FC<{ invitation: TInvitation }> = ({ invitation }) => {
	const { t } = useBntTranslate();
	const { accept, decline } = useInvitation(invitation);

	return (
		<TenantCard
			tenant={invitation}
			submitActionName={t(texts_a.accept, { capitalize: true })}
			onSubmitActionClick={accept}
			cancelActionName={t(texts_d.decline, { capitalize: true })}
			onCancelActionClick={decline}
		/>
	);
};
