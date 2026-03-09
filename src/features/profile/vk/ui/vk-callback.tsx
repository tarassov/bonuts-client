import { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import snakeCase from "snakecase-keys";

import { useBntTranslate } from "hooks/use-bnt-translate";
import { type PostVkConnectApiArg } from "services/api/bonuts-api";
import { texts_c, texts_v } from "services/localization/texts";

import { storage } from "@/shared/lib/localStorage";
import { isBlank } from "@/shared/lib/type-guards";
import { BntButton } from "@/shared/ui/buttons/bnt-button";
import headerLogo from "@/shared/ui/icons/bonuts_wordmark.png";

import { vkApi } from "../api/vk-api";
import { VK_REDIRECT_URI } from "../constants/vk-constants";
import { getVkAuthParams } from "../lib/get-vk-auth-params";
import { TVkResponse } from "../model/vk-plugin-types";

enum VK_AUTH_STATUS {
	redirect,
	validate,
	success,
	error,
}

function pickStatusFromParams(params?: TVkResponse): {
	status: VK_AUTH_STATUS;
	code?: string;
	state?: string;
	deviceId?: string;
	errorCode?: string;
} {
	if (isBlank(params)) return { status: VK_AUTH_STATUS.redirect };

	const { code, state, deviceId } = params;

	if (code) return { status: VK_AUTH_STATUS.validate, code, state, deviceId };

	return { status: VK_AUTH_STATUS.error };
}

const COOKIE_NAME = "vk-code-verifier";

const isVkConnectPayload = (vkParams: TVkResponse, codeVerifier: string | null | undefined): vkParams is Required<TVkResponse> => {
	return Boolean(vkParams.code && vkParams.state && vkParams.deviceId && codeVerifier);
};

export const VkCallback = ({ params }: { params: TVkResponse }) => {
	const { translate } = useBntTranslate();
	const derived = useMemo(() => pickStatusFromParams(params), [params]);
	const [status, setStatus] = useState(VK_AUTH_STATUS.redirect);
	const { getValue, setValue } = storage;

	const [connectVk] = vkApi.usePostVkConnectMutation();

	const postMessage = (message: any) => {
		if (window.opener) window.opener.postMessage(message);
	};

	useEffect(() => {
		setStatus(derived.status);
	}, [derived]);

	const redirectToVk = async () => {
		const { url, codeVerifier } = await getVkAuthParams();
		setValue(COOKIE_NAME, codeVerifier);

		window.location.href = url;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: runs only on first load
	useEffect(() => {
		if (isBlank(params)) redirectToVk();
	}, []);

	useEffect(() => {
		if (isBlank(params) || isBlank(params.code)) return;

		const codeVerifier = getValue(COOKIE_NAME);
		if (isBlank(codeVerifier)) return;

		if (isVkConnectPayload(params, codeVerifier)) {
			const body: PostVkConnectApiArg["body"] = snakeCase({ ...params, codeVerifier, redirectUrl: VK_REDIRECT_URI });

			connectVk({ body })
				.unwrap()
				.then(() => {
					setValue(COOKIE_NAME, undefined);
					postMessage({ success: true });
				})
				.catch((error) => {
					setValue(COOKIE_NAME, undefined);
					postMessage({ error });
				});
		}
	}, [params, connectVk]);

	const ui = useMemo(() => {
		switch (status) {
			case VK_AUTH_STATUS.redirect:
				return {
					title: translate(texts_v.vk_connecting_title),
					description: translate(texts_v.vk_connecting_description),
					showSpinner: true,
					actions: (
						<Stack direction="row" gap={1.5} justifyContent="center" flexWrap="wrap">
							<BntButton variant="text" onClick={window.close}>
								{translate(texts_c.cancel, { capitalize: true })}
							</BntButton>
						</Stack>
					),
					footer: translate(texts_v.vk_do_not_close),
				};

			case VK_AUTH_STATUS.validate:
				return {
					title: translate(texts_v.vk_success_title),
					description: translate(texts_v.vk_success_description),
					showSpinner: true,
				};
			default:
				return {
					title: translate(texts_v.vk_error_title),
					description: translate(texts_v.vk_error_description),
					showSpinner: false,
					actions: (
						<Stack direction="row" gap={1.5} justifyContent="center" flexWrap="wrap">
							<BntButton variant="contained" onClick={() => window.location.reload()}>
								{translate(texts_v.vk_try_again)}
							</BntButton>
							<BntButton variant="outlined" onClick={window.close}>
								{translate(texts_c.close, { capitalize: true })}
							</BntButton>
						</Stack>
					),
				};
		}
	}, [status, translate]);

	return (
		<Stack gap={2.5} alignItems="center" textAlign="center">
			{/* Header */}
			<Stack gap={1} alignItems="center">
				<Box sx={{ display: "grid", placeItems: "center" }}>
					<Box component="img" src={headerLogo} alt="Bonuts" sx={{ height: 24 }} />
				</Box>
				<Typography variant="h6" fontWeight={700}>
					{ui.title}
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
					{ui.description}
				</Typography>
			</Stack>

			{/* Body */}
			{ui.showSpinner ? (
				<Box sx={{ py: 0.5 }}>
					<CircularProgress size={28} />
				</Box>
			) : null}

			<Divider flexItem />

			{/* Actions */}
			<Box sx={{ width: "100%" }}>{ui.actions}</Box>

			{/* Footer */}
			<Typography variant="caption" color="text.secondary">
				{ui.footer}
			</Typography>
		</Stack>
	);
};
