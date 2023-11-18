import { Attributes, useIcons } from "hooks/use-icons";

export const useBonutsIcon = (attributes?: Partial<Attributes>) => {
	const { BonutsCurrency } = useIcons(attributes || { width: "20px", height: "20px" });
	return { BonutsCurrency };
};
