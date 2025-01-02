import { useLoader } from "shared/ui/loader/hooks/use-loader";
import { Modules } from "constants/modules";
import { Grid } from "@mui/material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_i } from "services/localization/texts";
import { TenantList } from "components/tenant/tenant-list";
import { useInvitationLoaderList } from "logic/hooks/invitation/use-invitation-loader-list";
import { InvitationCard } from "components/invitation/invitation-card";

export const UserInvitationsList = () => {
	const { objects, isLoading } = useInvitationLoaderList();
	const { t } = useBntTranslate();
	useLoader(Modules.MyInvitations, isLoading);
	if (!objects?.length) return null;
	return (
		<TenantList title={t(texts_i.invitations, { capitalize: true })}>
			{objects.map((invitation) => {
				return (
					<Grid key={invitation.id} item xs={12} sm={12} md={6} lg={3}>
						<InvitationCard invitation={invitation} />
					</Grid>
				);
			})}
		</TenantList>
	);
};
