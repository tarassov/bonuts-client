export type TransferOptions = {
	amount: number;
	comment: string;
	burnOld: boolean;
	toSelfAccount: boolean;
};
export type TransferProps =
	| (TransferOptions & { ids: Array<number>; forAll: false })
	| (TransferOptions & { forAll: true; ids: [] | undefined });

export type AdminDepositProps = {
	amount: number;
	comment?: string;
	toSelfAccount: boolean;
	ids: Array<number>;
};
