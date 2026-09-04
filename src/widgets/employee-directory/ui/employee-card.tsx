import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { CakeOutlined, ScheduleOutlined } from "@mui/icons-material";

import { getEmployeeInitials, getMonthsInTeam, getUpcomingBirthday, isNewTeammate } from "../model/employee-directory-helper";

import {
	EmployeeCardActionArea,
	EmployeeCardAvatar,
	EmployeeCardBadge,
	EmployeeCardBody,
	EmployeeCardCaption,
	EmployeeCardFooter,
	EmployeeCardMeta,
	EmployeeCardRoot,
	EmployeeName,
	EmployeePresenceBadge,
	EmployeeTransferButton,
} from "./employee-card.styled";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useEmployeeUi } from "@/logic/ui/use-employee-ui";
import { useTransferUi } from "@/logic/ui/use-transfer-ui";
import { texts_b, texts_g, texts_i, texts_n } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

type TEmployeeCardProps = {
	employee: TProfile;
};

export function EmployeeCard({ employee }: TEmployeeCardProps) {
	const { user_avatar, name } = employee;
	const { showEmployee } = useEmployeeUi(employee);
	const { showTransfer } = useTransferUi();
	const { i18n } = useTranslation();
	const { t } = useBntTranslate();
	const monthsInTeam = getMonthsInTeam(employee);
	const upcomingBirthday = getUpcomingBirthday(employee);
	const isNew = isNewTeammate(employee);
	const isBadgeVisible = isNew || Boolean(upcomingBirthday);
	const badgeLabel = isNew ? t(texts_n.new_team_member) : t(texts_b.birthday_soon);
	const birthdayLabel = upcomingBirthday?.toLocaleDateString(i18n.resolvedLanguage || i18n.language, { day: "numeric", month: "long" });
	const tenureLabel =
		monthsInTeam === null ? employee.position : monthsInTeam < 12 ? t(texts_i.in_team_months, { count: monthsInTeam }) : t(texts_i.in_team_years, { count: Math.floor(monthsInTeam / 12) });

	const handleTransferClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		showTransfer(employee.id);
	};

	return (
		<EmployeeCardRoot>
			<EmployeeCardActionArea onClick={() => showEmployee()}>
				<EmployeeCardBody>
					<div>
						<EmployeeCardBadge $tone={isNew ? "success" : "primary"} isVisible={isBadgeVisible}>
							{badgeLabel}
						</EmployeeCardBadge>
					</div>
					<EmployeePresenceBadge overlap="circular" variant="dot" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} invisible={!employee.is_online}>
						<EmployeeCardAvatar src={user_avatar?.preview?.url || user_avatar?.url || undefined} alt={name || undefined}>
							{getEmployeeInitials(employee)}
						</EmployeeCardAvatar>
					</EmployeePresenceBadge>
					<EmployeeCardCaption>
						<EmployeeName variant="body1">{name}</EmployeeName>
						<EmployeeCardMeta>
							{upcomingBirthday ? <CakeOutlined /> : <ScheduleOutlined />}
							<span>{upcomingBirthday ? t(texts_b.birthday_on, { date: birthdayLabel }) : tenureLabel}</span>
						</EmployeeCardMeta>
					</EmployeeCardCaption>
				</EmployeeCardBody>
			</EmployeeCardActionArea>
			<EmployeeCardFooter>
				<EmployeeTransferButton startIcon={<CakeOutlined />} onClick={handleTransferClick}>
					{t(texts_g.give_donuts, { capitalize: true })}
				</EmployeeTransferButton>
			</EmployeeCardFooter>
		</EmployeeCardRoot>
	);
}
