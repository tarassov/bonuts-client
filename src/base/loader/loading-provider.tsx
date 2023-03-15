import { createContext, FC, useState } from "react";
import { BntModalLoader } from "./modal-loader";

export const BntSetLoadingContext = createContext<(value: boolean) => void>(
	() => {}
);

export const BntLoadingProvider: FC<{
	children: JSX.Element | Array<JSX.Element>;
}> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	return (
		<BntSetLoadingContext.Provider value={setLoading}>
			<BntModalLoader loading={loading} />
			{children}
		</BntSetLoadingContext.Provider>
	);
};
