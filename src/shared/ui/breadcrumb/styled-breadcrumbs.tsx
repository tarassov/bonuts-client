import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";

import { cl } from "themes/helper";

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
