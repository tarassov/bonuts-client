import { FC } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { BntCard } from "shared/card/card";
import { CommentCardHeader } from "components/comment/comment-card/comment-card-header";
import { Dictionary } from "constants/dictionary";
import { useEmployeeLoader } from "logic/hooks/employee/use-employee-loader";
import { BntCardContent } from "shared/card/card-content";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TComment } from "@/types/model/comment";

export const CommentCard: FC<{ comment: TComment; className?: string }> = ({
	comment,
	className,
}) => {
	const { profile, content } = comment;
	const { employee } = useEmployeeLoader(profile?.id);
	const { t } = useBntTranslate();
	return (
		<BntCard className={className}>
			<CommentCardHeader
				action={
					<Tooltip title={t(Dictionary.PROFILE)}>
						<IconButton aria-label={t(Dictionary.PROFILE) || Dictionary.PROFILE} />
					</Tooltip>
				}
				title={profile?.user_name}
				subheader={employee?.position}
			/>
			<BntCardContent>
				<Typography variant="body2" component="p">
					{content}
				</Typography>
			</BntCardContent>
		</BntCard>
	);
};
