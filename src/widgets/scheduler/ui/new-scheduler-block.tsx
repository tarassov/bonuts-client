import { FC } from "react";
import { AddOutlined } from "@mui/icons-material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a } from "services/localization/texts";

import { BntButton } from "@/shared/ui/buttons/bnt-button";

export const NewSchedulerBlock: FC<{ onClick: VoidFunction }> = ({ onClick }) => {
	const { t } = useBntTranslate();
	return (
		<BntButton startIcon={<AddOutlined />} onClick={onClick} sx={{ maxWidth: 700 }}>
			{t(texts_a.add_new_scheduler, { capitalize: true })}{" "}
		</BntButton>
	);
};
