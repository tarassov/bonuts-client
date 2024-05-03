import { FC } from "react";
import { BntCard } from "shared/card/card";
import { BntCardBody } from "shared/card/card-body";
import classNames from "classnames";

export const CardWrapper: FC<{
	children?: JSX.Element | Array<JSX.Element>;
	transparent?: boolean;
	className?: string;
	maxWidth?: number;
}> = ({ children, className, transparent, maxWidth }) => {
	return (
		<BntCard
			className={classNames(className, "mt-2 height-100")}
			sx={{ background: transparent ? "transparent" : undefined, maxWidth }}
		>
			<BntCardBody className="height-100">{children}</BntCardBody>
		</BntCard>
	);
};
