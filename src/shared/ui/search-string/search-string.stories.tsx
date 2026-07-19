import { useState } from "react";
import { Box } from "@mui/material";

import { SearchString } from "./search-string";

const meta = {
	title: "Shared/UI/Search/Search String",
	component: SearchString,
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Default = {
	render: () => {
		const [value, setValue] = useState("");

		return (
			<Box sx={{ width: "min(640px, calc(100vw - 32px))" }}>
				<SearchString name="storybook-search-default" placeholder="Search teammates, teams, or recognition" setSearch={setValue} value={value} />
			</Box>
		);
	},
};

export const Surface = {
	render: () => {
		const [value, setValue] = useState("");

		return (
			<Box sx={{ width: "min(640px, calc(100vw - 32px))", p: 2, borderRadius: 2, bgcolor: "background.default" }}>
				<SearchString
					inputSx={{
						"& .MuiInput-root": {
							fontSize: { xs: "0.9375rem", sm: undefined },
						},
					}}
					mobilePlaceholder="Search"
					name="storybook-search-surface"
					placeholder="Search by name, email, or position"
					setSearch={setValue}
					value={value}
					variant="surface"
				/>
			</Box>
		);
	},
};
