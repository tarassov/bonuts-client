import type { FC, ReactNode } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";

import { blackBoxTexts, TEXT_MAX_LENGTH } from "@/entities/black-box";

import { ComposerActions, ComposerFooter, ComposerHint } from "./answer-composer.styles";
import { useBntTranslate } from "@/hooks/use-bnt-translate";

const ANSWER_MIN_ROWS = 3;

type TAnswerComposerProps = {
	value: string;
	onChange: (value: string) => void;
	/** The buttons differ between a new answer and an edit, the text field and the hint do not. */
	actions: ReactNode;
};

export const AnswerComposer: FC<TAnswerComposerProps> = ({ value, onChange, actions }) => {
	const { t } = useBntTranslate();

	return (
		<>
			<TextField
				multiline
				fullWidth
				minRows={ANSWER_MIN_ROWS}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={t(blackBoxTexts.answer_placeholder)}
				slotProps={{ htmlInput: { maxLength: TEXT_MAX_LENGTH, "aria-label": t(blackBoxTexts.answer_placeholder) } }}
			/>
			<ComposerFooter>
				<ComposerHint>
					<InfoOutlined />
					{t(blackBoxTexts.answer_hint)}
				</ComposerHint>
				<ComposerActions>{actions}</ComposerActions>
			</ComposerFooter>
		</>
	);
};
