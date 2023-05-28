import { Divider, useMediaQuery } from "@mui/material";
import { FC, useContext } from "react";
import { Theme } from "@mui/material/styles";
import { BntDrawer, BntDrawerHeader } from "shared/drawer";
import { AppContext } from "context/app-context";
import BonutsFullIcon from "icons/BonutsFullIcon.svg";
import BonutsIcon from "icons/BonutsIcon.svg";
import { BntTransparentButton } from "shared/buttons/transparent-button";
import { BntMainMenu } from "../main-menu/main-menu";

const BntSidebar: FC = () => {
	const { isDrawerOpen } = useContext(AppContext);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const { toggleDrawer } = useContext(AppContext);
	return (
		<div>
			{matches && (
				<BntDrawer variant="permanent" open={isDrawerOpen}>
					<BntDrawerHeader sx={{ padding: 0 }}>
						<BntTransparentButton
							onClick={toggleDrawer}
							sx={{ width: "100%", height: "100%", padding: 0 }}
						>
							{isDrawerOpen ? (
								<BonutsFullIcon style={{ width: "110px", height: "50px" }} />
							) : (
								<BonutsIcon style={{ width: "50px", height: "50px" }} />
							)}
						</BntTransparentButton>
					</BntDrawerHeader>
					<Divider />
					<BntMainMenu showFullName={isDrawerOpen} showTooltip={!isDrawerOpen} />
				</BntDrawer>
			)}
		</div>
	);
};

export default BntSidebar;
