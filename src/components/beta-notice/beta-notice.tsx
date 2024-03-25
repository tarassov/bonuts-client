import { BntTypography } from "shared/typography/typography";
import { FC } from "react";

export const BetaNotice: FC<{ className?: string }> = ({ className }) => {
	return (
		<BntTypography
			className={className}
			variant="caption2"
			color="secondary"
			sx={{
				transform: "rotate(-20deg) translate(0,-60%)",
				fontSize: "8px",
				border: "1px solid",
				padding: "0 4px",
				borderRadius: "30%",
			}}
		>
			beta
		</BntTypography>
	);
};
