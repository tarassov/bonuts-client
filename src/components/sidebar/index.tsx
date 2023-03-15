import { Divider, IconButton, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { BntDrawer, BntDrawerHeader } from "../../base/drawer";
import { AppContext } from "../../context/app-context";
import { ReactSVG } from "react-svg";
import { logoFull, logoSmall } from "../../constants/icons";
import { BntMainMenu } from "../main-menu/main-menu";
import { Theme } from "@mui/material/styles";

const BntSidebar: FC = () => {
	const { isDrawerOpen } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const { toggleDrawer } = useContext(AppContext);
	return (
		<>
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
		</>
	);
};

export default BntSidebar;
