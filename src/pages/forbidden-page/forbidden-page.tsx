import { useBntTranslate } from "hooks/use-bnt-translate";
import { Box, Stack } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { BntTypography } from "shared/typography/typography";
import { texts_a } from "services/localization/texts";

export const ForbiddenPage = () => {
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
				<LockOutlined sx={{ height: "150px", width: "150px" }} />
				<BntTypography variant="h5">{t(texts_a.access_denied)}</BntTypography>
			</Stack>
		</Box>
	);
};
