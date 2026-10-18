import { useState } from "react";
import { Button } from "@mui/material";

import { BntTypography } from "@/shared/ui/typography";

import { BntSidePanel } from "./side-panel";

const meta = {
	title: "Shared/UI/Drawer/Side Panel",
	component: BntSidePanel,
	parameters: {
		layout: "centered",
	},
};

export default meta;

const SidePanelDemo = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button variant="contained" onClick={() => setIsOpen(true)}>
				Open side panel
			</Button>
			<BntSidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Side panel">
				<BntTypography color="text.secondary" sx={{ p: 2 }}>
					Full-width on phones, a fixed-width panel on wider screens.
				</BntTypography>
			</BntSidePanel>
		</>
	);
};

export const Default = {
	render: () => <SidePanelDemo />,
};
