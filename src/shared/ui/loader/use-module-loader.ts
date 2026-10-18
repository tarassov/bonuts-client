import { useLoader } from "./use-loader";
import { Modules } from "@/constants/modules";

export const useModuleLoader = (args: { module: Modules; isLoading: boolean }) => {
	const { module, isLoading } = args;

	useLoader(module, isLoading);
};
