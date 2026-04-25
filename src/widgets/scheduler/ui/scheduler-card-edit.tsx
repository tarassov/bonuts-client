import { FC } from "react";
import { DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import classNames from "classnames";

import { BntProfileButton } from "components/buttons/profile-button";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a } from "services/localization/texts";
import { emptyFunction } from "utils/empty-function";

import { BntBox } from "@/shared/ui/box";
import { BntCard } from "@/shared/ui/card";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { SchedulerForm } from "./scheduler-form";
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
						<BntTypography variant="caption2">{t(texts_a.author, { capitalize: true })}</BntTypography>
						<BntProfileButton profile={scheduler.profile} onClick={emptyFunction} />
					</BntStack>
					<BntBox>
						<IconButton onClick={onDelete} sx={{ width: 40 }}>
							<DeleteOutlined />
						</IconButton>
					</BntBox>
				</BntStack>
			)}
			<SchedulerForm defaultValue={scheduler} onCancel={closeEdit} onSubmit={handleSubmit} />
		</BntCard>
	);
};
