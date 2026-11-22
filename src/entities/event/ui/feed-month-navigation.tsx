import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { formatFeedMonth, type groupFeedByMonth } from "../lib/group-feed-by-month";

import classes from "./event-list.module.scss";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_m } from "@/services/localization/texts";

type TFeedMonthNavigationProps = {
	months: ReturnType<typeof groupFeedByMonth>;
	visibleMonth?: string;
	isRefreshing: boolean;
	isMobile: boolean;
	onSelect: (key: string) => void;
};

export function FeedMonthNavigation({ months, visibleMonth, isRefreshing, isMobile, onSelect }: TFeedMonthNavigationProps) {
	const { i18n } = useTranslation();
	const { t } = useBntTranslate();
	const railRef = useRef<HTMLElement>(null);
	const label = t(texts_m.month_of_publication);
	const options = months.flatMap(({ key, date }) => (date ? [{ key, label: formatFeedMonth(date, i18n.language) }] : []));

	useEffect(() => {
		const rail = railRef.current;
		const active = rail?.querySelector('[aria-current="true"]');
		if (!rail || !active || !visibleMonth) return;

		const railBounds = rail.getBoundingClientRect();
		const activeBounds = active.getBoundingClientRect();
		if (activeBounds.top < railBounds.top) rail.scrollTop += activeBounds.top - railBounds.top;
		if (activeBounds.bottom > railBounds.bottom) rail.scrollTop += activeBounds.bottom - railBounds.bottom;
	}, [visibleMonth]);

	if (!options.length) return null;

	if (isMobile) {
		return (
			<div className={classes.monthPicker}>
				<select aria-label={label} value={visibleMonth ?? options[0].key} disabled={isRefreshing} onChange={(event) => onSelect(event.target.value)}>
					{options.map(({ key, label: month }) => (
						<option key={key} value={key}>
							{month}
						</option>
					))}
				</select>
			</div>
		);
	}

	return (
		<nav ref={railRef} className={classes.monthRail} aria-label={label}>
			<ul>
				{options.map(({ key, label: month }) => (
					<li key={key}>
						<button
							type="button"
							aria-label={month}
							title={month}
							aria-current={visibleMonth === key ? "true" : undefined}
							disabled={isRefreshing}
							onMouseDown={(event) => {
								if (event.button === 0) event.preventDefault();
							}}
							onClick={() => onSelect(key)}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
