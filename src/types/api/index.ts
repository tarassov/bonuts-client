export type TPaginator = {
	perPage: number;
	totalPages: number;
};

export type TPageable<T> = T & { paginator: TPaginator };
