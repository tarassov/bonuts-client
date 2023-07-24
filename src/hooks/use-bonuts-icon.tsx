import { Attributes, useIcons } from "hooks/use-icons";

export const useBonutsIcon = (attributes?: Partial<Attributes>) => {
	const { BonutsCurrency } = useIcons(attributes || { width: "16px", height: "16px" });
	return { BonutsCurrency };
};
