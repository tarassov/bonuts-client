import { CellContext, FilterFn } from "@tanstack/react-table";
import { TBaseModel } from "@/types/model";

export enum CellType {
	CellString = "CellString",
	CellNumber = "CellNumber",
	CellAction = "CelleAction",
}

export enum HeaderType {
	StringHeader = "StringHeader",
	ActionHeader = "ActionHeader",
}

export enum ActionType {
	Edit = "Edit",
	Accept = "Accept",
	Decline = "Decline",
	Create = "Create",
	Delete = "Delete",
}

export type ColumnHeader = {
	headerType: HeaderType;
	value?: string | JSX.Element;
};

export type TTableColumn<T extends TBaseModel> = {
	accessor?: keyof T;
	cellType?: CellType;
	header?: ColumnHeader;
	enableSorting?: boolean;
	cell?: (info?: CellContext<T, string>) => JSX.Element;
	enableColumnFilter?: boolean;
	filterFn?: FilterFn<T>;
};
export type TTableAction = {
	onClick?: (id?: number) => void;
	actionType?: ActionType;
	icon?: JSX.Element;
};

export type TTableConfig<T extends TBaseModel> = {
	columns: Array<TTableColumn<T>>;
	actions?: Record<string, TTableAction>;
	headerActions?: Record<string, TTableAction>;
};
