import { Symbols } from "../../constants/symbols";

export const getUserName = (name?: string, surname?: string) => {
	return `${name}${name ? Symbols.Space : Symbols.Empty}${surname}`;
};
