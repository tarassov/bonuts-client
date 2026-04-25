import type { ReactElement } from "react";

import _ from "lodash";

import { TTableColumn } from "@/shared/ui/react-table/types";

import { TBaseModel } from "@/types/model";

export const headerFactory = <T extends TBaseModel>(column: TTableColumn<T>, nameTransformer?: (value?: string | null) => string): string | ReactElement => {
	const transformer = nameTransformer || ((value: any) => value);
	if (column.header?.value) {
		if (_.isString(column.header?.value)) {
			return transformer(column.header.value);
		}
		return column.header.value;
	}
	return transformer(column.accessor);
};
