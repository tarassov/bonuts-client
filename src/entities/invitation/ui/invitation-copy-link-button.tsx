import type { FC } from "react";
import { memo } from "react";
import { ContentCopyOutlined } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useCopyInvitationLink } from "../model/use-copy-invitation-link";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c } from "@/services/localization/texts";

interface IInvitationCopyLinkButtonProps {
	invitationId: string;
}

const CopyButton = styled(IconButton)({
	border: "1px solid var(--invitation-divider)",
	borderRadius: 10,
	color: "var(--invitation-primary-main)",
});

const InvitationCopyLinkButtonComponent: FC<IInvitationCopyLinkButtonProps> = ({ invitationId }) => {
	const { t } = useBntTranslate();
	const { copyInvitationLink, isCopying } = useCopyInvitationLink(invitationId);
	const label = t(texts_c.copy_invitation_link, { capitalize: true });

	const handleClick = async () => {
		await copyInvitationLink();
	};

	return (
		<Tooltip title={label}>
			<span>
				<CopyButton aria-label={label} disabled={isCopying} onClick={handleClick} size="small">
					{isCopying ? <CircularProgress color="inherit" size={16} /> : <ContentCopyOutlined fontSize="small" />}
				</CopyButton>
			</span>
		</Tooltip>
	);
};

export const InvitationCopyLinkButton = memo(InvitationCopyLinkButtonComponent);
