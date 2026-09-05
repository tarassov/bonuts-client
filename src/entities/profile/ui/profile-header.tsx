import { type CSSProperties, useMemo } from "react";
import { PhotoLibraryOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c, texts_m, texts_p } from "services/localization/texts";

import { BntTransparentButton } from "@/shared/ui/buttons";
import { BntCard } from "@/shared/ui/card";
import { EditableImage } from "@/shared/ui/editable-image";
import { BntTypography } from "@/shared/ui/typography";

import { ProfileStatusChips, useUpdateAvatar } from "@/entities/profile";

import classes from "./profile-header.module.scss";
import type { TProfile } from "@/types/model";

function getDisplayName(profile: TProfile | undefined, fallback: string) {
	const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
	return fullName || profile?.user_name || profile?.name || fallback;
}

function getAvatarInitials(profile?: TProfile) {
	const source = [profile?.first_name, profile?.last_name].filter(Boolean);

	if (source.length > 0) {
		return source
			.map((part) => part?.trim()?.[0] || "")
			.join("")
			.slice(0, 2);
	}

	const fallback = profile?.user_name || profile?.name || "P";
	return fallback
		.split(/\s+/)
		.map((part) => part?.[0] || "")
		.join("")
		.slice(0, 2);
}

interface IProfileHeaderProps {
	onPhotosClick?: VoidFunction;
	profile?: TProfile;
}

export function ProfileHeader({ onPhotosClick, profile }: IProfileHeaderProps) {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const { postAvatar } = useUpdateAvatar();

	const displayName = useMemo(() => getDisplayName(profile, translate(texts_p.profile)), [profile, translate]);
	const initials = useMemo(() => getAvatarInitials(profile), [profile]);
	const isDarkMode = theme.palette.mode === "dark";

	const cardThemeStyle: CSSProperties = {
		"--profile-header-bg-start": isDarkMode ? theme.palette.background.paper : "#FFFFFF",
		"--profile-header-bg-end": isDarkMode ? theme.palette.background.paper : "rgba(255, 255, 255, 0.96)",
		"--profile-header-accent-glow": isDarkMode ? theme.palette.accent.veryLight : theme.palette.accent.light,
	} as CSSProperties;

	const handleAvatarChange = (file: File) => {
		if (!profile?.id) return;

		return postAvatar({ file, id: profile.id });
	};

	return (
		<BntCard data-testid="profile-header" className={classes.card} style={cardThemeStyle}>
			<div className={classes.layout}>
				<div className={classes.avatarColumn}>
					<EditableImage alt={displayName} fallback={initials} imageUrl={profile?.user_avatar?.url} label={translate(texts_c.change_avatar)} onChange={handleAvatarChange} />
					{onPhotosClick ? (
						<BntTransparentButton startIcon={<PhotoLibraryOutlined />} onClick={onPhotosClick}>
							{translate(texts_m.my_photos)}
						</BntTransparentButton>
					) : null}
				</div>
				<div className={classes.meta}>
					<BntTypography variant="h4" className={classes.title}>
						{displayName}
					</BntTypography>
					{profile?.position ? (
						<BntTypography variant="body1" color="text.secondary" className={classes.position}>
							{profile.position}
						</BntTypography>
					) : null}
					{profile?.admin || profile?.active === false || profile?.store_admin ? (
						<div data-testid="profile-header-statuses" className={classes.roles}>
							<ProfileStatusChips
								profile={profile}
								adminSx={{
									backgroundColor: theme.palette.accent.light,
									color: theme.palette.accent.main,
									fontWeight: 600,
									borderRadius: "999px",
								}}
							/>
						</div>
					) : null}
				</div>
			</div>
		</BntCard>
	);
}
