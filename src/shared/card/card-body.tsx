import { FC, ReactNode, SyntheticEvent } from "react";

export const BntCardBody: FC<{
	children: ReactNode | ReactNode[];
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
}> = ({ children, className, onClick }) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={className} onClick={onClick}>
			{children}
		</div>
	);
};
