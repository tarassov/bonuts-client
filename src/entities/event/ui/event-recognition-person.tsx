import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntTypography } from "@/shared/ui/typography";

import { useEmployeeUi } from "@/entities/profile";

import { RecognitionPerson } from "./event-recognition-header.styles";
import type { TProfile } from "@/types/model/profile";

export function EventRecognitionPerson({ profile }: { profile: TProfile }) {
	const { showEmployeeModal } = useEmployeeUi();
	const handleOpenProfile = () => showEmployeeModal(profile.id);
	const name = profile.user_name || profile.name;

	return (
		<RecognitionPerson onClick={handleOpenProfile}>
			<ProfileAvatar avatarUrl={profile.user_avatar?.thumb?.url} name={name} hasOnlineBadge={profile.is_online !== undefined} isOnline={Boolean(profile.is_online)} />
			<span>
				<BntTypography variantMapping={{ subtitle2: "span" }} variant="subtitle2" display="block" fontWeight={700}>
					{name}
				</BntTypography>
				{profile.position ? (
					<BntTypography variantMapping={{ subtitle2: "span" }} variant="caption" display="block" color="text.secondary">
						{profile.position}
					</BntTypography>
				) : null}
			</span>
		</RecognitionPerson>
	);
}
