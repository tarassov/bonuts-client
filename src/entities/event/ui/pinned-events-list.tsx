import { useTheme } from "@mui/material";

import { BntBox } from "@/shared/ui/box";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { PinnedListRow } from "./pinned-events-strip-styled";
import type { TPost } from "@/types/model/post";

type TPinnedEventsListProps = {
	posts: Array<TPost>;
	activeIndex: number;
	onSelect: (index: number) => void;
};

export function PinnedEventsList({ posts, activeIndex, onSelect }: TPinnedEventsListProps) {
	const theme = useTheme();

	return (
		<BntStack direction="column" gap={1} sx={{ mt: 1.5 }} data-testid="pinned-events-list">
			{posts.map((post, rowIndex) => (
				<PinnedListRow key={post.id} isActive={rowIndex === activeIndex} onClick={() => onSelect(rowIndex)}>
					<ProfileAvatar avatarUrl={post.profile.user_avatar?.thumb?.url} name={post.profile.user_name} />
					<BntBox sx={{ flex: 1, minWidth: 0 }}>
						<BntTypography variant="body2" sx={{ fontWeight: 700 }} noWrap>
							{post.profile.user_name}
						</BntTypography>
						<BntTypography variant="body2" noWrap sx={{ color: theme.palette.neutral.dark, opacity: 0.8 }}>
							{post.content}
						</BntTypography>
					</BntBox>
				</PinnedListRow>
			))}
		</BntStack>
	);
}
