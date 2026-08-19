import { AddRounded, WorkspacesOutlined } from "@mui/icons-material";

import { BntButton } from "@/shared/ui/buttons";
import { SearchString } from "@/shared/ui/search-string";
import { BntSectionHeader } from "@/shared/ui/section";
import { BntSurface } from "@/shared/ui/surface";
import { BntTypography } from "@/shared/ui/typography";

import { CircleListItem } from "./circle-list-item";
import styles from "./circles-page.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_c, texts_s } from "@/services/localization/texts";
import type { TCircle } from "@/types/model";

interface ICirclesPageViewProps {
	circles: Array<TCircle>;
	filteredCircles: Array<TCircle>;
	onCreate: VoidFunction;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
	onQueryChange: (query: string) => void;
	query: string;
}

export function CirclesPageView(props: ICirclesPageViewProps) {
	const { circles, filteredCircles, onCreate, onDelete, onEdit, onQueryChange, query } = props;
	const { t } = useBntTranslate();
	const hasCircles = circles.length > 0;
	const hasVisibleCircles = filteredCircles.length > 0;

	return (
		<main className={styles.page} data-testid="circles-page">
			<BntSectionHeader className={styles.pageHeader}>
				<div>
					<BntTypography as="h1" className={styles.pageTitle}>
						{t(texts_c.circles_title)}
					</BntTypography>
					<BntTypography as="p" color="text.secondary">
						{t(texts_c.circles_description)}
					</BntTypography>
				</div>
				<BntButton color="primary" noTransform onClick={onCreate} startIcon={<AddRounded />} variant="contained">
					{t(texts_c.create_circle)}
				</BntButton>
			</BntSectionHeader>

			<BntSurface className={styles.listSurface}>
				<div className={styles.toolbar}>
					<SearchString name="circle-search" placeholder={t(texts_s.search_circles)} setSearch={onQueryChange} value={query} variant="surface" />
					<BntTypography color="text.secondary" variant="body2">
						{t(texts_c.circles_count, { count: filteredCircles.length })}
					</BntTypography>
				</div>

				{hasVisibleCircles ? (
					<ul className={styles.circleList}>
						{filteredCircles.map((circle) => (
							<CircleListItem circle={circle} key={circle.id} onDelete={onDelete} onEdit={onEdit} />
						))}
					</ul>
				) : (
					<div className={styles.emptyState}>
						<span className={styles.emptyIcon} aria-hidden="true">
							<WorkspacesOutlined />
						</span>
						<BntTypography as="h2" variant="h6">
							{hasCircles ? t(texts_c.circles_search_empty_title) : t(texts_c.circles_empty_title)}
						</BntTypography>
						<BntTypography color="text.secondary">{hasCircles ? t(texts_c.circles_search_empty_description) : t(texts_c.circles_empty_description)}</BntTypography>
						{!hasCircles ? (
							<BntButton color="primary" noTransform onClick={onCreate} variant="outlined">
								{t(texts_c.create_circle)}
							</BntButton>
						) : null}
					</div>
				)}
			</BntSurface>
		</main>
	);
}
