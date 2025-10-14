import { FC } from "react";
import { Android } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import classNames from "classnames";

import { BntCard } from "shared/ui/card/card";
import { BntCardActions } from "shared/ui/card/card-actions";
import { BntCardContent } from "shared/ui/card/card-content";
import { BntStack } from "shared/ui/stack";
import { BntTypography } from "shared/ui/typography/typography";

import { formatStringDate } from "utils/format-string-date";

import { Dictionary } from "constants/dictionary";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { useEmployeeLoader } from "logic/hooks/employee/use-employee-loader";

import { CommentCardHeader } from "components/comment/comment-card/comment-card-header";

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
						{profile?.user_avatar && (
							<Avatar src={profile?.user_avatar?.thumb?.url || undefined} alt={profile.user_name || undefined} />
						)}
						{!profile?.user_avatar && (
							<Avatar>
								<Android />
							</Avatar>
						)}
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
