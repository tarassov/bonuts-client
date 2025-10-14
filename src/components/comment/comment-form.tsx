import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";

import { BntStack } from "shared/ui/stack";

import { texts_c, texts_s } from "services/localization/texts";

import { useBntTranslate } from "hooks/use-bnt-translate";

export const CommentForm: FC<{
	onSubmit: (comment: string) => Promise<void>;
	className?: string;
}> = ({ onSubmit, className }) => {
	const { translate } = useBntTranslate();
	const {
		register: fieldRegister,
		reset,
		handleSubmit,
	} = useForm<{ comment: string }>({
		shouldUseNativeValidation: false,
	});

	const submit = async (data: { comment: string }) => {
		const { comment } = data;
		try {
			await onSubmit(comment);
		} catch {
			return;
		}
		reset();
	};

	return (
		<Box component="form" className={className} onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
			<TextField
				multiline
				minRows={4}
				maxRows={8}
				className="width-100"
				placeholder={translate(texts_c.comment, { capitalize: true })}
				{...fieldRegister("comment", { required: translate(texts_c.comment) })}
			/>
			<BntStack flexDirection="row" justifyContent="flex-end">
				<Button type="submit" variant="contained" sx={{ minWidth: 150, mt: 2 }}>
					{translate(texts_s.send)}
				</Button>
			</BntStack>
		</Box>
	);
};
