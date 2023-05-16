import { bonutsApi } from "services/api/bonuts-api";

export function updateQueryData(
	endpointName: any,
	originalArgs: any,
	response: any
) {
	return bonutsApi.util.updateQueryData(
		endpointName,
		originalArgs,
		(draft: any) => {
			const data = response?.data?.data;
			const dataArr = Array.isArray(data) ? data : [data];
			if (Array.isArray(dataArr)) {
				dataArr.forEach((el) => {
					if (draft.data) {
						const objectToChange = draft.data.find((e: any) => e.id === el.id);
						if (objectToChange) {
							Object.assign(objectToChange, el);
						}
					}
				});
			}
		}
	);
}
