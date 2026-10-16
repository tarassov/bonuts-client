import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import _ from "lodash";

export const useBntTranslate = () => {
	const { t } = useTranslation();

	const translate = useCallback(
		(value?: string | null, options?: { count?: number; capitalize?: boolean; [key: string]: unknown }): string => {
			let res = "";
			if (value) {
				res = t(value, {
					...options,
					...(options?.count || options?.count === 0 ? { count: options?.count } : {}),
				});
				if (options?.capitalize) {
					res = _.capitalize(res);
				}
			}

			return res;
		},
		[t]
	);

	return { translate, t: translate };
};
