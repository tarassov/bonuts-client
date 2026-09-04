import { InfiniteScrollTrigger } from "@/shared/ui/infinite-scroll-trigger";
import { BntTypography } from "@/shared/ui/typography";

import type { EmployeeListSort } from "@/entities/profile";

import { EmployeeCard } from "./employee-card";
import styles from "./employee-directory.module.scss";
import { EmployeeDirectoryToolbar } from "./employee-directory-toolbar";
import type { TProfile } from "@/types/model";

interface IEmployeeListViewProps {
	employees: Array<TProfile>;
	hasNext: boolean;
	isFetching: boolean;
	loadedPageCount: number;
	onlineCount: number;
	query: string;
	sort: EmployeeListSort;
	texts: {
		description: string;
		emptyDescription: string;
		emptyTitle: string;
		onlineCount: string;
		teamCount: string;
		title: string;
	};
	onQueryChange: (query: string) => void;
	onLoadMore: VoidFunction;
	onSortChange: (sort: EmployeeListSort) => void;
}

export function EmployeeListView({ employees, hasNext, isFetching, loadedPageCount, onlineCount, query, sort, texts, onLoadMore, onQueryChange, onSortChange }: IEmployeeListViewProps) {
	return (
		<section className={styles.root}>
			<header className={styles.header}>
				<BntTypography className={styles.title} color="text.heading" variant="h4">
					{texts.title}
				</BntTypography>
				<BntTypography className={styles.description} color="text.secondary" variant="body2">
					{texts.description}
				</BntTypography>
			</header>
			<EmployeeDirectoryToolbar query={query} sort={sort} onQueryChange={onQueryChange} onSortChange={onSortChange} />
			<div className={styles.summary}>
				<BntTypography color="text.secondary" variant="body2">
					{texts.teamCount}
				</BntTypography>
				<BntTypography className={styles.onlineSummary} color="text.secondary" variant="caption">
					<span className={styles.onlineDot} aria-hidden="true" />
					{texts.onlineCount}
				</BntTypography>
			</div>
			{employees.length ? (
				<div className={styles.grid}>
					{employees.map((employee) => (
						<EmployeeCard key={employee.id} employee={employee} />
					))}
				</div>
			) : (
				<div className={styles.empty}>
					<BntTypography color="text.heading" variant="h6">
						{texts.emptyTitle}
					</BntTypography>
					<BntTypography color="text.secondary" variant="body2">
						{texts.emptyDescription}
					</BntTypography>
				</div>
			)}
			{hasNext ? <InfiniteScrollTrigger isFetching={isFetching} loadedPageCount={loadedPageCount} onLoadMore={onLoadMore} /> : null}
		</section>
	);
}
