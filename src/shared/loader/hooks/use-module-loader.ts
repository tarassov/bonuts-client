import { Modules } from "constants/modules";
import { useLoader } from "shared/loader/hooks/use-loader";

export const useModuleLoader = (args: { module: Modules; isLoading: boolean }) => {
	const { module, isLoading } = args;

	useLoader(module, isLoading);
};
