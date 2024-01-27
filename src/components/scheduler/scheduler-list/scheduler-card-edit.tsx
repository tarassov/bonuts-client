import { BntCard } from "shared/card/card";
import { BntStack } from "shared/stack/stack";
import { Box, IconButton } from "@mui/material";
import { texts_a } from "services/localization/texts";
import { BntTypography } from "shared/typography/typography";
import { FC } from "react";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { SchedulerForm } from "components/scheduler/scheduler-form";
import { BntProfileButton } from "components/buttons/profile-button";
import { emptyFunction } from "utils/empty-function";
import classNames from "classnames";
import { DeleteOutlined } from "@mui/icons-material";
import { TNewScheduler, TScheduler } from "@/types/model/scheduler";

export const SchedulerCardEdit: FC<{
	scheduler: TScheduler;
	onSubmit?: (scheduler: TNewScheduler) => void;
	onDelete?: VoidFunction;
	closeEdit: VoidFunction;
}> = ({ scheduler, onSubmit, closeEdit, onDelete = emptyFunction }) => {
	const { t } = useBntTranslate();

	const handleSubmit = (newScheduler: TNewScheduler) => {
		onSubmit?.(newScheduler);
		closeEdit();
	};

	return (
		<BntCard className={classNames("p-2")} raised>
			{scheduler.profile && (
				<BntStack direction="row" justifyContent="space-between">
					<BntStack justifyContent="flex-start" direction="row" alignItems="center" gap={2}>
						<BntTypography variant="caption2">
							{t(texts_a.author, { capitalize: true })}
						</BntTypography>
						<BntProfileButton profile={scheduler.profile} onClick={emptyFunction} />
					</BntStack>
					<Box>
						<IconButton onClick={onDelete} sx={{ width: 40 }}>
							<DeleteOutlined />
						</IconButton>
					</Box>
				</BntStack>
			)}
			<SchedulerForm defaultValue={scheduler} onCancel={closeEdit} onSubmit={handleSubmit} />
		</BntCard>
	);
};
