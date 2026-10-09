import type { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import type { TPaginator } from "@/types/api/api";

export const getPaginator = (meta: FetchBaseQueryMeta | undefined): TPaginator => {
	return {
		perPage: Number(meta?.response?.headers.get("Per-Page")),
		total: Number(meta?.response?.headers.get("Total")),
	};
};
