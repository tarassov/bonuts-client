const buildFormDataNode = (formData: FormData, data: Record<string, any>, parentKey?: string) => {
	if (data && typeof data === "object" && !(data instanceof Date) && !(data instanceof File)) {
		if (Object.keys(data).length) {
			Object.keys(data).forEach((key) => {
				buildFormDataNode(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
			});
		} else {
			formData.append(parentKey!, JSON.stringify([]));
		}
	} else if (data instanceof Date) {
		formData.append(parentKey!, data.toISOString());
	} else {
		formData.append(parentKey!, data === null ? "" : data);
	}
	return formData;
};

export const buildFormData = (data: Record<string, any>): FormData => {
	return buildFormDataNode(new FormData(), data);
};
