export type TActionCallback<T> = {
	onSuccess?: (result: T) => void;
	onError?: (message?: string) => void;
};
