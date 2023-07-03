import { FC } from "react";
import { BntCard } from "shared/card/card";
import { BntCardBody } from "shared/card/card-body";

export const ElementWrapper: FC<{ children?: JSX.Element | Array<JSX.Element> }> = ({
	children,
}) => {
	return (
		<BntCard className="mt-2">
			<BntCardBody className="m-3 p-3">{children}</BntCardBody>
		</BntCard>
	);
};
