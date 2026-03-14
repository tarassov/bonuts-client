import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@mui/material";

import { useIcons } from "hooks/use-icons";
import { GetVkMeApiResponse } from "services/api/bonuts-api";
import { texts_v } from "services/localization/texts";
import { present } from "shared/lib/type-guards";
import { emptyFunction } from "utils/empty-function";

import { useCurrentProfile } from "@/shared/model/auth";

import { useRegisterPlugin } from "@/entities/plugin";

import { useDeleteVkDisconnectMutation } from "../api/vk-api";
import { authWindow } from "../lib/auth-window";

import { useVkUser } from "./use-vk-user";
import { routesPath } from "routes/config/routes-path";

const NAME = "vk";

export function VkPlugin() {
	const { t } = useTranslation();
	const { user, isLoading, refetch } = useVkUser();
	const { authTenant, profile } = useCurrentProfile();
	const { Vk } = useIcons({ width: "30px", height: "30px", variant: "primary" });
	const [deleteVkDisconnect] = useDeleteVkDisconnectMutation();
	const onConnectRef = useRef<{ callback: (connected: boolean) => void }>({ callback: emptyFunction });
	const dataRef = useRef<{ user?: GetVkMeApiResponse }>({ user: undefined });

	useEffect(() => {
		dataRef.current.user = user;

		if (!isLoading && user) {
			if (present(onConnectRef.current.callback)) onConnectRef.current.callback(present(user.vk_user_id));
		}
	}, [isLoading, user]);

	useRegisterPlugin(NAME, {
		isConnected: () => {
			return present(dataRef.current.user) && present(dataRef.current.user.vk_user_id);
		},
		getDisabledState: () => {
			const messagesAvailable = dataRef.current.user?.messages_available;
			const messageLink = dataRef.current.user?.message_link;

			if (messagesAvailable) return { disabled: false };

			return {
				disabled: true,
				reason: (
					<>
						{t(texts_v.vk_notifications_disabled_prefix)}
						{messageLink ? (
							<Link href={messageLink} target="_blank" rel="noreferrer">
								{t(texts_v.vk_notifications_disabled_link)}
							</Link>
						) : null}
						{messageLink ? ", " : " "}
						{t(texts_v.vk_notifications_disabled_suffix)}
					</>
				),
			};
		},
		onConnectChange: (callback: (connected: boolean) => void) => {
			onConnectRef.current = { callback };
		},
		connect: async () => {
			await new Promise((resolve) => {
				authWindow(routesPath.VkCallback, (response) => {
					resolve(response);
				});
			});

			if (present(onConnectRef.current.callback)) {
				onConnectRef.current.callback(true);
				refetch();
			}
		},
		disconnect: async () => {
			await deleteVkDisconnect({ tenant: authTenant || undefined, userId: profile?.id }).unwrap();

			if (present(onConnectRef.current.callback)) onConnectRef.current.callback(false);
		},
		icon: <Vk />,
		hideName: false,
	});

	return null;
}
