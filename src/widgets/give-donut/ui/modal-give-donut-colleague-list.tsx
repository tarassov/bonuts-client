import { alpha, List, ListItemButton, ListItemText, styled } from "@mui/material";

import { ProfileAvatar } from "@/shared/ui/profile-avatar";

import { getEmployeeAvatarUrl, getEmployeeDisplayName, type TSelectedEmployee } from "../model/modal-give-donut-model";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_n } from "@/services/localization/texts";
import type { TProfile } from "@/types/model";

const ColleagueListItem = styled(ListItemButton)(({ theme }) => ({
	borderRadius: theme.spacing(1.5),
	border: `1px solid ${theme.palette.divider}`,
	padding: theme.spacing(1, 1.25),
	backgroundColor: theme.palette.background.paper,
	transition: theme.transitions.create(["border-color", "background-color", "transform"]),
	"&:hover": {
		borderColor: theme.palette.primary.main,
		backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.06),
		transform: "translateY(-1px)",
	},
}));

interface IModalGiveDonutColleagueListProps {
	colleagues: Array<TProfile>;
	onEmployeeSelect: (employee: TSelectedEmployee) => void;
}

export function ModalGiveDonutColleagueList({ colleagues, onEmployeeSelect }: IModalGiveDonutColleagueListProps) {
	const { t } = useBntTranslate();
	const noNameFallback = t(texts_n.no_name);

	const handleEmployeeSelect = (employee: TProfile) => {
		onEmployeeSelect({
			id: employee.id,
			name: getEmployeeDisplayName(employee, noNameFallback),
		});
	};

	return (
		<List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			{colleagues.map((employee) => {
				const displayName = getEmployeeDisplayName(employee, noNameFallback);

				return (
					<ColleagueListItem key={employee.id} onClick={() => handleEmployeeSelect(employee)}>
						<ProfileAvatar avatarUrl={getEmployeeAvatarUrl(employee)} name={displayName} />
						<ListItemText
							sx={{ ml: 1.5 }}
							primary={displayName}
							secondary={employee.position || undefined}
							slotProps={{
								primary: {
									fontWeight: 600,
								},
							}}
						/>
					</ColleagueListItem>
				);
			})}
		</List>
	);
}
