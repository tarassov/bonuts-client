import { useBntTranslate } from "hooks/use-bnt-translate";
import { Stack } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { BntTypography } from "shared/typography/typography";
import { texts_a } from "services/localization/texts";
import { BntBox } from "shared/box/bnt-box";

export const ForbiddenPage = () => {
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
				<LockOutlined sx={{ height: "150px", width: "150px" }} />
				<BntTypography variant="h5">{t(texts_a.access_denied)}</BntTypography>
			</Stack>
		</BntBox>
	);
};
