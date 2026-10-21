import type { FC } from "react";
import { useEffect } from "react";
import { LockOpenOutlined, LockOutlined, PublicOutlined, VisibilityOffOutlined } from "@mui/icons-material";

import blackBoxTexts from "../config/black-box-texts";
import { CHEST_MODE_META, ChestMode } from "../model/chest-mode";

import {
	CHEST_ANIMATION_MS,
	ChestBody,
	ChestBox,
	ChestCaption,
	ChestCard,
	ChestCardLabel,
	ChestCardText,
	ChestGlow,
	ChestLid,
	ChestLock,
	ChestOverlay,
	ChestScene,
	ChestStage,
	ChestSubtitle,
	ChestTitle,
} from "./chest-animation.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

type TChestAnimationProps = {
	mode: ChestMode;
	/** The question that drops into the box or rises out of it. */
	text: string;
	/** Called when the animation ends or the viewer clicks it away. */
	onFinish: () => void;
};

export const ChestAnimation: FC<TChestAnimationProps> = ({ mode, text, onFinish }) => {
	const { t } = useBntTranslate();
	const meta = CHEST_MODE_META[mode];
	const isOpen = mode === ChestMode.Open;

	useEffect(() => {
		const timer = window.setTimeout(onFinish, CHEST_ANIMATION_MS);

		return () => window.clearTimeout(timer);
	}, [onFinish]);

	return (
		<ChestOverlay role="status" aria-label={t(meta.title)} title={t(blackBoxTexts.chest_skip)} onClick={onFinish}>
			<ChestScene>
				<ChestStage>
					<ChestGlow mode={mode} />
					<ChestCard mode={mode}>
						<ChestCardLabel mode={mode}>
							{isOpen ? <PublicOutlined /> : <VisibilityOffOutlined />}
							{t(meta.cardLabel)}
						</ChestCardLabel>
						<ChestCardText>{text}</ChestCardText>
					</ChestCard>
					<ChestBox mode={mode}>
						<ChestLid mode={mode} />
						<ChestBody>
							<ChestLock mode={mode}>{isOpen ? <LockOpenOutlined /> : <LockOutlined />}</ChestLock>
						</ChestBody>
					</ChestBox>
				</ChestStage>
				<ChestCaption>
					<ChestTitle>{t(meta.title)}</ChestTitle>
					<ChestSubtitle>{t(meta.caption)}</ChestSubtitle>
				</ChestCaption>
			</ChestScene>
		</ChestOverlay>
	);
};
