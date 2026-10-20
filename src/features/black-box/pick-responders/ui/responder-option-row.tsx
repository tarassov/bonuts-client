import type { FC, HTMLAttributes } from "react";

import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import type { TBlackBoxProfile } from "@/entities/black-box";

type TResponderOptionRowProps = HTMLAttributes<HTMLLIElement> & {
	profile: TBlackBoxProfile;
};

export const ResponderOptionRow: FC<TResponderOptionRowProps> = ({ profile, ...optionProps }) => (
	<li {...optionProps}>
		<BntStack direction="row" alignItems="center" gap={1.25}>
			<ProfileAvatar avatarUrl={profile.avatar} name={profile.full_name} fallback={null} />
			<BntStack direction="column" gap={0}>
				<BntTypography variant="body2" fontWeight={600}>
					{profile.full_name}
				</BntTypography>
				<BntTypography variant="caption" color="text.secondary">
					{profile.position}
				</BntTypography>
			</BntStack>
		</BntStack>
	</li>
);
