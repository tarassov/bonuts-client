import { useState } from "react";
import { DeleteOutlineRounded, EditOutlined, MoreVertRounded } from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_d, texts_e } from "@/services/localization/texts";

interface ICircleActionsMenuProps {
	circleId: number;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

export function CircleActionsMenu({ circleId, onDelete, onEdit }: ICircleActionsMenuProps) {
	const { t } = useBntTranslate();
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
	const isOpen = Boolean(anchorElement);

	const handleClose = () => setAnchorElement(null);

	const handleEdit = () => {
		handleClose();
		onEdit(circleId);
	};

	const handleDelete = () => {
		handleClose();
		onDelete(circleId);
	};

	return (
		<>
			<IconButton
				aria-label={t(texts_c.circle_actions)}
				aria-controls={isOpen ? `circle-actions-${circleId}` : undefined}
				aria-expanded={isOpen || undefined}
				aria-haspopup="menu"
				onClick={(event) => setAnchorElement(event.currentTarget)}
			>
				<MoreVertRounded />
			</IconButton>
			<Menu anchorEl={anchorElement} id={`circle-actions-${circleId}`} onClose={handleClose} open={isOpen}>
				<MenuItem onClick={handleEdit}>
					<ListItemIcon>
						<EditOutlined fontSize="small" />
					</ListItemIcon>
					<ListItemText>{t(texts_e.edit_circle)}</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
					<ListItemIcon sx={{ color: "inherit" }}>
						<DeleteOutlineRounded fontSize="small" />
					</ListItemIcon>
					<ListItemText>{t(texts_d.delete_circle)}</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
}
