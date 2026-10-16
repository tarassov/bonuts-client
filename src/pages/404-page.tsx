import { NotAccessibleOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_p } from "services/localization/texts";

import { BntBox } from "@/shared/ui/box";
import { BntTypography } from "@/shared/ui/typography";

export const Page404 = () => {
	const { t } = useBntTranslate();
	return (
		<BntBox
			sx={{
				alignItems: "center",
				width: "100%",
				height: "60vh",
				display: "flex",
				justifyContent: "center",
			}}
			component="div"
		>
			<Stack direction="column">
				<NotAccessibleOutlined sx={{ height: "150px", width: "150px" }} />
				<BntTypography variant="h5">{t(texts_p.page_not_found)}</BntTypography>
			</Stack>
		</BntBox>
	);
};
