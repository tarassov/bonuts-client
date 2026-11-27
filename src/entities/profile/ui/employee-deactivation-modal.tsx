import { PauseCircleOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { BntButton } from "@/shared/ui/buttons";
import type { TDialogProps } from "@/shared/ui/dialog";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_d } from "@/services/localization/texts";

const PauseMark = styled(PauseCircleOutline)(({ theme }) => ({
	boxSizing: "content-box",
	padding: theme.spacing(1.5),
	borderRadius: theme.spacing(2),
	backgroundColor: alpha(theme.palette.primary.main, 0.16),
	color: theme.palette.text.primary,
	fontSize: 24,
}));

export function EmployeeDeactivationModal({ name, onSubmit, close }: TDialogProps & { name?: string; onSubmit: VoidFunction }) {
	const { t } = useBntTranslate();

	const confirm = () => {
		onSubmit();
		close();
	};

	return (
		<Stack gap={2} sx={{ p: { xs: 2, sm: 3 }, overflowWrap: "anywhere" }}>
			<Stack direction="row" gap={1.5} alignItems="center">
				<PauseMark aria-hidden />
				{name ? <Typography fontWeight={600}>{name}</Typography> : null}
			</Stack>
			<Typography color="text.secondary">{t(texts_d.deactivate_account_description)}</Typography>
			<Stack direction="row" gap={1} justifyContent="flex-end" flexWrap="wrap">
				<BntButton noTransform autoFocus onClick={() => close()}>
					{t(texts_c.cancel, { capitalize: true })}
				</BntButton>
				<BntButton noTransform disableElevation variant="contained" color="error" onClick={confirm}>
					{t(texts_d.deactivate, { capitalize: true })}
				</BntButton>
			</Stack>
		</Stack>
	);
}
