import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FC } from "react";
import { push } from "redux-first-history";
import { useAppDispatch } from "../../services/store/store";

type BNTRouteMenuButtonProps = {
	route: TRoute;
	showFullName: boolean;
};
export const BNTRouteMenuButton: FC<BNTRouteMenuButtonProps> = ({
	route,
	showFullName,
}) => {
	const dispatch = useAppDispatch();
	const onClick = (e: React.SyntheticEvent) => {
		dispatch(push(route.path));
	};

	return (
		<ListItemButton
			sx={{
				minHeight: 48,
				justifyContent: showFullName ? "initial" : "center",
				px: 2.5,
			}}
			onClick={onClick}
		>
			<ListItemIcon
				sx={{
					minWidth: 0,
					mr: showFullName ? 3 : "auto",
					justifyContent: "center",
				}}
			>
				{route.icon}
			</ListItemIcon>
			<ListItemText
				primary={route.navbarName}
				sx={{ opacity: showFullName ? 1 : 0 }}
			/>
		</ListItemButton>
	);
};
