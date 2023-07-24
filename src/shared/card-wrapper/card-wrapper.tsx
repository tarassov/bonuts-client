import { FC } from "react";
import { BntCard } from "shared/card/card";
import { BntCardBody } from "shared/card/card-body";
import classNames from "classnames";

export const CardWrapper: FC<{
	children?: JSX.Element | Array<JSX.Element>;
	className?: string;
}> = ({ children, className }) => {
	return (
		<BntCard className={classNames(className, "mt-2 height-100")}>
			<BntCardBody className="height-100">{children}</BntCardBody>
		</BntCard>
	);
};
