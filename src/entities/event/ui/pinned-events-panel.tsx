import { Close, PushPinOutlined } from "@mui/icons-material";
import { Button, IconButton, useTheme } from "@mui/material";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_a, texts_n, texts_o, texts_p } from "services/localization/texts";

import { formatStringDate } from "@/shared/lib/date";
import { BntBox } from "@/shared/ui/box";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useEventUi } from "../model/use-event-ui";

import { EventImages } from "./event-images";
import { PinnedEventsList } from "./pinned-events-list";
import { PinnedChip, PinnedDotButton, PinnedPanel, PinnedPanelText } from "./pinned-events-strip-styled";
import type { TPost } from "@/types/model/post";

type TPinnedEventsPanelProps = {
	posts: Array<TPost>;
	index: number;
	label: string;
	isListOpen: boolean;
	onClose: VoidFunction;
	onSelect: (index: number) => void;
	onToggleList: VoidFunction;
};

export function PinnedEventsPanel({ posts, index, label, isListOpen, onClose, onSelect, onToggleList }: TPinnedEventsPanelProps) {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const current = posts[index];
	const { showDetailedPost } = useEventUi(current);
	const { profile, content, images, pinned_at, date_string_utc } = current;
	const hasMany = posts.length > 1;
	const pinnedOnLabel = translate(texts_p.pinned_on, { date: formatStringDate(pinned_at || date_string_utc, true) });
	const mutedColor = { color: theme.palette.neutral.dark, opacity: 0.72 };

	return (
		<PinnedPanel data-testid="pinned-events-panel">
			<BntStack direction="row" alignItems="center" gap={1} sx={{ mb: 1.5 }}>
				<PinnedChip>
					<PushPinOutlined />
					{label}
				</PinnedChip>
				<IconButton size="small" onClick={onClose} aria-label={translate(texts_p.pinned, { capitalize: true })} sx={{ ml: "auto", ...mutedColor }}>
					<Close />
				</IconButton>
			</BntStack>

			<BntStack direction="row" alignItems="center" gap={1.5}>
				<ProfileAvatar avatarUrl={profile.user_avatar?.thumb?.url} name={profile.user_name} hasOnlineBadge isOnline={Boolean(profile.is_online)} />
				<BntBox sx={{ flex: 1, minWidth: 0 }}>
					<BntTypography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
						{profile.user_name}
					</BntTypography>
					<BntTypography variant="caption" sx={mutedColor}>
						{[profile.position, pinnedOnLabel].filter(Boolean).join(" · ")}
					</BntTypography>
				</BntBox>
			</BntStack>

			<PinnedPanelText>{content}</PinnedPanelText>
			<EventImages images={images} imageLabel={translate(texts_p.photos)} />

			<BntStack direction="row" alignItems="center" gap={1} flexWrap="wrap" sx={{ mt: 1.75 }}>
				<Button variant="contained" color="primary" size="small" disableElevation onClick={showDetailedPost} sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700 }}>
					{translate(texts_o.open_in_feed, { capitalize: true })}
				</Button>
				{hasMany ? (
					<Button variant="text" color="inherit" size="small" onClick={onToggleList} sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, ...mutedColor, opacity: 0.8 }}>
						{translate(texts_a.all_pinned, { capitalize: true })}
					</Button>
				) : null}
				{hasMany ? (
					<BntStack direction="row" gap={1} sx={{ ml: "auto" }}>
						{posts.map((post, dotIndex) => (
							<PinnedDotButton
								key={post.id}
								type="button"
								isActive={dotIndex === index}
								onClick={() => onSelect(dotIndex)}
								aria-label={translate(texts_n.next_pinned, { capitalize: true })}
								data-testid="pinned-events-dot"
							/>
						))}
					</BntStack>
				) : null}
			</BntStack>

			{isListOpen && hasMany ? <PinnedEventsList posts={posts} activeIndex={index} onSelect={onSelect} /> : null}
		</PinnedPanel>
	);
}
