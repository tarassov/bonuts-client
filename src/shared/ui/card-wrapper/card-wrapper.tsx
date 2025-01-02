import { FC } from "react";
import { BntCard } from "shared/ui/card/card";
import { BntCardBody } from "shared/ui/card/card-body";
import classNames from "classnames";

export const CardWrapper: FC<{
	children?: JSX.Element | Array<JSX.Element>;
	transparent?: boolean;
	className?: string;
}> = ({ children, className, transparent }) => {
	return (
		<BntCard
			className={classNames(className, "mt-2 height-100")}
			sx={{ background: transparent ? "transparent" : undefined }}
		>
			<BntCardBody className="height-100">{children}</BntCardBody>
		</BntCard>
	);
};
