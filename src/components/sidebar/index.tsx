import { Divider, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { BNTDrawer, BNTDrawerHeader } from "../../base/BNTDrawer";
import { AppContext } from "../../context";
import { ReactSVG } from "react-svg";
import { logoFull } from "../../constants/icons";
import { BNTMainMenu } from "../main-menu";
import { Theme } from "@mui/material/styles";

const BNTSidebar: FC = () => {
	const { isDrawerOpen } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

	return (
		<>
			{matches && (
				<BNTDrawer variant="permanent" open={isDrawerOpen}>
					<BNTDrawerHeader>
						<ReactSVG src={logoFull} />
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
