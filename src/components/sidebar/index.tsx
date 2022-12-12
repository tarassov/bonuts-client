import { Divider, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { BNTDrawer, BNTDrawerHeader } from "../../base/BNTDrawer";
import { AppContext } from "../../context";
import { ReactSVG } from "react-svg";
import { logoFull } from "../../constants/icons";
import { BNTMainMenu } from "../main-menu";
import { Theme } from "@mui/material/styles";

type BNTSidebarProps = {
	routes: Array<TRoute>;
};

const BNTSidebar: FC<BNTSidebarProps> = ({ routes }) => {
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
						routes={routes}
						showFullName={isDrawerOpen}
						showTooltip={!isDrawerOpen}
					/>
				</BNTDrawer>
			)}
		</>
	);
};

export default BNTSidebar;
