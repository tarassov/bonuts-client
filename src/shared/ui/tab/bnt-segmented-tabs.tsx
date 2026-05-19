import type { SyntheticEvent } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

type TSegmentedValue = string | number;

export type TBntSegmentedTabItem<TValue extends TSegmentedValue = TSegmentedValue> = {
	count?: number;
	disabled?: boolean;
	label: string;
	value: TValue;
};

type TBntSegmentedTabsProps<TValue extends TSegmentedValue = TSegmentedValue> = {
	ariaLabel: string;
	className?: string;
	items: Array<TBntSegmentedTabItem<TValue>>;
	onChange: (value: TValue) => void;
	value: TValue;
};

const SegmentedTabsRoot = styled(Tabs)(({ theme }) => ({
	minHeight: 56,
	padding: 4,
	borderRadius: 16,
	border: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.paper,
	"& .MuiTabs-indicator": {
		display: "none",
	},
	"& .MuiTabs-flexContainer": {
		gap: 4,
	},
}));

const SegmentedTab = styled(Tab)(({ theme }) => ({
	minHeight: 48,
	minWidth: 0,
	borderRadius: 12,
	paddingInline: 16,
	textTransform: "none",
	fontSize: theme.typography.body1.fontSize,
	fontWeight: 600,
	color: theme.palette.text.secondary,
	"&.Mui-selected": {
		backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.08),
		color: theme.palette.primary.main,
	},
}));

const CountPill = styled("span")(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	minWidth: 24,
	height: 24,
	paddingInline: 8,
	borderRadius: 999,
	backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.16 : 0.08),
	fontSize: theme.typography.caption.fontSize,
	fontWeight: 700,
	lineHeight: 1,
}));

export const BntSegmentedTabs = <TValue extends TSegmentedValue>({ ariaLabel, className, items, onChange, value }: TBntSegmentedTabsProps<TValue>) => {
	const handleChange = (_event: SyntheticEvent, nextValue: TValue) => {
		onChange(nextValue);
	};

	return (
		<SegmentedTabsRoot allowScrollButtonsMobile aria-label={ariaLabel} className={className} onChange={handleChange} scrollButtons={false} value={value} variant="scrollable">
			{items.map((item) => (
				<SegmentedTab
					disabled={item.disabled}
					key={item.value}
					label={
						<Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
							<span>{item.label}</span>
							{typeof item.count === "number" ? <CountPill>{item.count}</CountPill> : null}
						</Box>
					}
					value={item.value}
				/>
			))}
		</SegmentedTabsRoot>
	);
};
