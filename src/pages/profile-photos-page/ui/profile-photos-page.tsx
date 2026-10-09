import { ProfilePhotos, useProfile } from "@/entities/profile";

export function ProfilePhotosPage() {
	const { profile } = useProfile();

	return <ProfilePhotos profile={profile} canUpload />;
}
