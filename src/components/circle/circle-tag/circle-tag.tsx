import { FC } from "react";
import { emptyFunction } from "utils/empty-function";
import { BntChip } from "shared/ui/chip/chip";
import * as React from "react";

export const CircleTag: FC<{ title?: string; onClick?: VoidFunction }> = ({
	title,
	onClick = emptyFunction,
}) => {
	return (
		<BntChip color="info" title={title} label={title} sx={{ maxWidth: 150 }} onClick={onClick} />
	);
};
