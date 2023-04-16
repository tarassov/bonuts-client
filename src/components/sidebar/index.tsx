import { Divider, IconButton, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { ReactSVG } from "react-svg";
import { Theme } from "@mui/material/styles";
import { BntDrawer, BntDrawerHeader } from "shared/drawer";
import { AppContext } from "context/app-context";
import { logoFull, logoSmall } from "constants/icons";
import { BntMainMenu } from "../main-menu/main-menu";

const BntSidebar: FC = () => {
	const { isDrawerOpen } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const { toggleDrawer } = useContext(AppContext);
	return (
		<div>
			{matches && (
				<BntDrawer variant="permanent" open={isDrawerOpen}>
					<BntDrawerHeader>
						<IconButton onClick={toggleDrawer}>
							<ReactSVG src={isDrawerOpen ? logoFull : logoSmall} />
						</IconButton>
					</BntDrawerHeader>
					<Divider />
					<BntMainMenu
						showFullName={isDrawerOpen}
						showTooltip={!isDrawerOpen}
					/>
				</BntDrawer>
			)}
		</div>
	);
};

export default BntSidebar;
