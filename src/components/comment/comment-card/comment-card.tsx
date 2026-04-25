import type { FC } from "react";
import { Android } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";

import classNames from "classnames";

import { CommentCardHeader } from "components/comment/comment-card/comment-card-header";
import { Dictionary } from "constants/dictionary";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntCard } from "shared/ui/card/card";
import { BntCardActions } from "shared/ui/card/card-actions";
import { BntCardContent } from "shared/ui/card/card-content";
import { ProfileAvatar } from "shared/ui/profile-avatar";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { formatStringDate } from "@/shared/lib/date";

import { useEmployeeLoader } from "@/entities/profile/model/use-employee-loader";

import type { TComment } from "@/types/model/comment";

export const CommentCard: FC<{ comment: TComment; className?: string }> = ({ comment, className }) => {
	const { profile, content, date_string_utc } = comment;
	const { employee } = useEmployeeLoader(profile?.id);
	const { t } = useBntTranslate();
	return (
		<BntCard className={classNames(className)}>
			<CommentCardHeader
				avatar={
					<>
						<ProfileAvatar avatarUrl={profile?.user_avatar?.thumb?.url} name={profile?.user_name} fallback={<Android />} />
					</>
				}
				action={
					<Tooltip title={t(Dictionary.PROFILE)}>
						<IconButton aria-label={t(Dictionary.PROFILE) || Dictionary.PROFILE} />
					</Tooltip>
				}
				title={employee?.user_name}
				subheader={employee?.position}
			/>
			<BntCardContent>
				<BntTypography variant="body2" isPreformatted>
					{content}
				</BntTypography>
			</BntCardContent>
			<BntCardActions disableSpacing>
				<BntStack direction="row" justifyContent="flex-end" className="width-100">
					<Typography variant="caption" component="div">
						{formatStringDate(date_string_utc, false, true)}
					</Typography>
				</BntStack>
			</BntCardActions>
		</BntCard>
	);
};
