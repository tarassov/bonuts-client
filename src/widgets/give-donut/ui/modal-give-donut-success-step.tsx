import { CakeOutlined } from "@mui/icons-material";
import { alpha, Button, styled } from "@mui/material";

import { BntBox } from "@/shared/ui/box";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_d, texts_r } from "@/services/localization/texts";

const SUCCESS_ICON_FRAME_SIZE = 9;
const SUCCESS_ICON_SIZE = 4.5;
const SUCCESS_CONTENT_MIN_HEIGHT = 40;
const SUCCESS_MESSAGE_MAX_WIDTH = 40;

const SuccessLayout = styled(BntStack)(({ theme }) => ({
	minHeight: theme.spacing(SUCCESS_CONTENT_MIN_HEIGHT),
	textAlign: "center",
}));

const SuccessIconFrame = styled(BntBox)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: theme.spacing(SUCCESS_ICON_FRAME_SIZE),
	height: theme.spacing(SUCCESS_ICON_FRAME_SIZE),
	borderRadius: "50%",
	background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.24)}, ${alpha(theme.palette.primary.main, 0.08)})`,
	color: theme.palette.primary.main,
}));

const SuccessIcon = styled(CakeOutlined)(({ theme }) => ({
	fontSize: theme.spacing(SUCCESS_ICON_SIZE),
}));

const SuccessMessage = styled(BntTypography)(({ theme }) => ({
	maxWidth: theme.spacing(SUCCESS_MESSAGE_MAX_WIDTH),
}));

interface IModalGiveDonutSuccessStepProps {
	onClose: VoidFunction;
}

export function ModalGiveDonutSuccessStep({ onClose }: IModalGiveDonutSuccessStepProps) {
	const { t } = useBntTranslate();

	return (
		<SuccessLayout alignItems="center" justifyContent="center" gap={2}>
			<SuccessIconFrame>
				<SuccessIcon />
			</SuccessIconFrame>
			<BntTypography variant="h5">{t(texts_d.donuts_are_on_the_way, { capitalize: true })}</BntTypography>
			<SuccessMessage color="text.secondary">{t(texts_r.recognition_sent, { capitalize: true })}</SuccessMessage>
			<Button variant="contained" onClick={onClose}>
				{t(texts_c.close, { capitalize: true })}
			</Button>
		</SuccessLayout>
	);
}
