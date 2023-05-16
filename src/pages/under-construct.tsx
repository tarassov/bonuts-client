import { Box, Stack } from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_u } from "services/localization/texts/texts_u";
import { BntTypography } from "shared/typography/typography";

export const UnderConstruct = () => {
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
				<ConstructionOutlined sx={{ height: "150px", width: "150px" }} />
				<BntTypography variant="h5">{t(texts_u.under_construct)}</BntTypography>
			</Stack>
		</Box>
	);
};
