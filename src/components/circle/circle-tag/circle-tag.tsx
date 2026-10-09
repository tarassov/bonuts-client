import * as React from "react";
import { FC } from "react";

import { emptyFunction } from "utils/empty-function";

import { BntChip } from "@/shared/ui/chip";

export const CircleTag: FC<{ title?: string; onClick?: VoidFunction }> = ({ title, onClick = emptyFunction }) => {
	return <BntChip color="info" title={title} label={title} sx={{ maxWidth: 150 }} onClick={onClick} />;
};
