import { useTranslation } from "react-i18next";
import _ from "lodash";

export const useBntTranslate = () => {
	const { t } = useTranslation();

	const translate = (
		value?: string | null,
		options?: { count?: number; capitalize?: boolean }
	): string => {
		let res = "";
		if (value) {
			res = t(value, { ...(options?.count ? { count: options?.count } : {}) });
			if (options?.capitalize) {
				res = _.capitalize(res);
			}
		}

		return res;
	};

	return { translate, t: translate };
};
