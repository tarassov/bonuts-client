import { Box, Stack } from "@mui/material";
import { NotAccessibleOutlined } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { BntTypography } from "shared/typography/typography";
import { texts_p } from "services/localization/texts";

export const Page404 = () => {
	const { t } = useBntTranslate();
	return (
		<Box
			sx={{
				alignItems: "center",
				width: "100%",
				height: "60vh",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Stack direction="column">
				<NotAccessibleOutlined sx={{ height: "150px", width: "150px" }} />
				<BntTypography variant="h5">{t(texts_p.page_not_found)}</BntTypography>
			</Stack>
		</Box>
	);
};
