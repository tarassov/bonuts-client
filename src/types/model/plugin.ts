export type TPlugin = {
	id: number;
	name: string;
	active?: boolean;
	settings?:
		| {
				id: number;
				name: string;
				value?: string;
				notes?: string | null;
		  }[]
		| null;
};
