import { styled } from "@mui/material/styles";
import { ChildPathMenuPure } from "components/child-path/child-path-menu/child-path-menu-pure";

export const ChildPathMenuStyled = styled(
	ChildPathMenuPure,
	{}
)(() => {
	return {
		justifyContent: "center",
		alignItems: "center",
	};
});
