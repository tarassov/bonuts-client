import { useState } from "react";
import { DonutSmallOutlined, ListAltOutlined, PaidOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

import { BntSegmentedTabs } from "./bnt-segmented-tabs";

const meta = {
	title: "Shared/UI/Tabs/Segmented Tabs",
	component: BntSegmentedTabs,
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Default = {
	render: () => {
		const [value, setValue] = useState("incoming");

		return (
			<Box sx={{ width: "min(720px, 100vw - 32px)" }}>
				<BntSegmentedTabs
					ariaLabel="Requests tabs"
					items={[
						{ count: 8, label: "Incoming", value: "incoming" },
						{ count: 3, label: "In progress", value: "active" },
						{ count: 15, label: "Completed", value: "closed" },
					]}
					onChange={setValue}
					value={value}
				/>
			</Box>
		);
	},
};

export const RequestsTabs = {
	render: () => {
		const [value, setValue] = useState("incoming");

		return (
			<Box sx={{ width: "min(720px, 100vw - 32px)" }}>
				<BntSegmentedTabs
					ariaLabel="Team requests"
					items={[
						{ count: 12, label: "Incoming", value: "incoming" },
						{ count: 4, label: "Active", value: "active" },
						{ label: "Closed", value: "closed" },
					]}
					onChange={setValue}
					value={value}
				/>
			</Box>
		);
	},
};

export const WithIcons = {
	render: () => {
		const [value, setValue] = useState("all");

		return (
			<Box sx={{ width: "min(520px, 100vw - 32px)" }}>
				<BntSegmentedTabs
					ariaLabel="Account type"
					items={[
						{ count: 18, icon: <ListAltOutlined />, label: "All", value: "all" },
						{ count: 12, icon: <PaidOutlined />, label: "Coins", value: "coins" },
						{ count: 6, icon: <DonutSmallOutlined />, label: "Donuts", value: "donuts" },
					]}
					onChange={setValue}
					value={value}
				/>
			</Box>
		);
	},
};
