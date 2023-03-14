import { createContext, FC, useState } from "react";
import { BNTModalLoader } from "./modal-loader";

export const BntSetLoadingContext = createContext<(value: boolean) => void>(
	() => {}
);

export const BntLoadingProvider: FC<{
	children: JSX.Element | Array<JSX.Element>;
}> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	return (
		<BntSetLoadingContext.Provider value={setLoading}>
			<BNTModalLoader loading={loading} />
			{children}
		</BntSetLoadingContext.Provider>
	);
};
