import { Divider, IconButton, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { BNTDrawer, BNTDrawerHeader } from "../../base/BNTDrawer";
import { AppContext } from "../../context/app-context";
import { ReactSVG } from "react-svg";
import { logoFull, logoSmall } from "../../constants/icons";
import { BNTMainMenu } from "../main-menu";
import { Theme } from "@mui/material/styles";

const BNTSidebar: FC = () => {
	const { isDrawerOpen } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const { toggleDrawer } = useContext(AppContext);
	return (
		<>
			{matches && (
				<BNTDrawer variant="permanent" open={isDrawerOpen}>
					<BNTDrawerHeader>
						<IconButton onClick={toggleDrawer}>
							<ReactSVG src={isDrawerOpen ? logoFull : logoSmall} />
						</IconButton>
					</BNTDrawerHeader>
					<Divider />
					<BNTMainMenu
						showFullName={isDrawerOpen}
						showTooltip={!isDrawerOpen}
					/>
				</BNTDrawer>
			)}
		</>
	);
};

export default BNTSidebar;
