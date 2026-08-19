import type { ReactNode } from "react";

import { isBlank } from "@/shared/lib/type-guards";
import { BntBox } from "@/shared/ui/box";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

type TBntFormGroupHeaderProps = {
	description?: string;
	headerContent?: ReactNode;
	title?: string;
};

export const BntFormGroupHeader = ({ description, headerContent, title }: TBntFormGroupHeaderProps) => {
	if (isBlank(title) && isBlank(headerContent)) {
		return null;
	}

	return (
		<BntStack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
			<BntBox sx={{ flex: 1, minWidth: 0 }}>
				<BntTypography as="h2" sx={{ fontSize: "0.95rem", fontWeight: 700 }}>
					{title}
				</BntTypography>
				{description ? (
					<BntTypography as="p" color="text.secondary" sx={{ mt: 0.5 }} variant="caption">
						{description}
					</BntTypography>
				) : null}
			</BntBox>
			{headerContent}
		</BntStack>
	);
};
