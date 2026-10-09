import { FC, ReactNode, SyntheticEvent } from "react";

export const BntCardBody: FC<{
	children: ReactNode | ReactNode[];
	onClick?: (e: SyntheticEvent) => void;
	className?: string;
}> = ({ children, className, onClick }) => {
	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: <explanation>
		// biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className={className} onClick={onClick}>
			{children}
		</div>
	);
};
