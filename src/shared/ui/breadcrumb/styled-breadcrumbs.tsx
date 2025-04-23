import { styled } from "@mui/material/styles";
import { cl } from "themes/helper";
import Breadcrumbs from "@mui/material/Breadcrumbs";

interface StyledBreadcrumbProps {
	hasLink?: boolean;
}
export const BntStyledBreadcrumbs = styled(
	Breadcrumbs,
	{}
)<StyledBreadcrumbProps>(() => {
	return {
		[cl("MuiBreadcrumbs-li")]: {
			overflow: "hidden !important",
		},
	};
});
