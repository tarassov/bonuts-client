import { FC } from "react";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { BntCard } from "shared/card/card";
import { CommentCardHeader } from "components/comment/comment-card/comment-card-header";
import { Dictionary } from "constants/dictionary";
import { useEmployeeLoader } from "logic/hooks/employee/use-employee-loader";
import { BntCardContent } from "shared/card/card-content";
import { useBntTranslate } from "hooks/use-bnt-translate";
import classNames from "classnames";
import { Android } from "@mui/icons-material";
import { BntCardActions } from "shared/card/card-actions";
import { EVENT_CARD_CLASSES } from "components/event/event-card/classes";
import { BntStack } from "shared/stack/stack";
import { formatStringDate } from "utils/format-string-date";
import { BntTypography } from "shared/typography/typography";
import { TComment } from "@/types/model/comment";

export const CommentCard: FC<{ comment: TComment; className?: string }> = ({
	comment,
	className,
}) => {
	const { profile, content, date_string_utc } = comment;
	const { employee } = useEmployeeLoader(profile?.id);
	const { t } = useBntTranslate();
	return (
		<BntCard className={classNames(className)}>
			<CommentCardHeader
				avatar={
					<>
						{profile?.user_avatar && (
							<Avatar
								src={profile?.user_avatar?.thumb?.url || undefined}
								alt={profile.user_name || undefined}
							/>
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
			<BntCardActions disableSpacing className={EVENT_CARD_CLASSES.cardActions}>
				<BntStack direction="row" justifyContent="flex-end" className="width-100">
					<Typography
						variant="caption"
						component="div"
						className={EVENT_CARD_CLASSES.cardDateCaption}
					>
						{formatStringDate(date_string_utc, false, true)}
					</Typography>
				</BntStack>
			</BntCardActions>
		</BntCard>
	);
};
