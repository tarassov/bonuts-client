import { ChangeEvent, type CSSProperties, useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

import { useBntTranslate } from "hooks/use-bnt-translate";

import { BntCard } from "@/shared/ui/card/card";
import { BntTypography } from "@/shared/ui/typography";

import { ProfileStatusChips, useUpdateAvatar } from "@/entities/profile";

import classes from "./profile-header.module.scss";
import type { TProfile } from "@/types/model";

function getDisplayName(profile?: TProfile) {
	const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
	return fullName || profile?.user_name || profile?.name || "Profile";
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

export function ProfileHeader({ profile }: { profile?: TProfile }) {
	const { translate } = useBntTranslate();
	const theme = useTheme();
	const { postAvatar } = useUpdateAvatar();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const displayName = useMemo(() => getDisplayName(profile), [profile]);
	const initials = useMemo(() => getAvatarInitials(profile), [profile]);
	const avatarUrl = previewUrl || profile?.user_avatar?.url || "";
	const isDarkMode = theme.palette.mode === "dark";

	const cardThemeStyle: CSSProperties = {
		"--profile-header-bg-start": isDarkMode ? theme.palette.background.paper : "#FFFFFF",
		"--profile-header-bg-end": isDarkMode ? theme.palette.background.paper : "rgba(255, 255, 255, 0.96)",
		"--profile-header-accent-glow": isDarkMode ? theme.palette.accent.veryLight : theme.palette.accent.light,
	} as CSSProperties;

	const handleAvatarClick = () => {
		inputRef.current?.click();
	};

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file || !profile?.id) return;

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreviewUrl(String(reader.result || ""));
		};

		reader.readAsDataURL(file);
		postAvatar({ file, id: profile.id });
	};

	return (
		<BntCard data-testid="profile-header" className={classes.card} style={cardThemeStyle}>
			<div className={classes.layout}>
				<div>
					<button type="button" className={classes.avatarButton} onClick={handleAvatarClick}>
						{avatarUrl ? <img src={avatarUrl} alt={displayName} className={classes.avatarImage} /> : <div className={classes.avatarFallback}>{initials}</div>}
						<div className={classes.avatarOverlay}>{translate("Change avatar")}</div>
					</button>
					<input ref={inputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
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
