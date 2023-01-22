export type TPaginator = {
	perPage: number;
	total: number;
};

export type TPageable<T> = T & { paginator: TPaginator };
