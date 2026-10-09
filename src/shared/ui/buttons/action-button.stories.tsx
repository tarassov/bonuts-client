import { CakeOutlined } from "@mui/icons-material";

import { BntActionButton, BntActionButtonVariant } from "./action-button";

const meta = {
	title: "Shared/UI/Buttons/Action Button",
	component: BntActionButton,
	args: {
		icon: <CakeOutlined />,
		onClick: () => undefined,
		text: "Give donuts",
		variant: BntActionButtonVariant.brandGradient,
	},
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const BrandGradient = {};
