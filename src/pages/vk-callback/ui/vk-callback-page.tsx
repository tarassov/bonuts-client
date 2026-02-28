import * as React from "react";
import { useEffect, useMemo } from "react";
import { Box, Button, CircularProgress, Divider, Typography, useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";

import { texts_p } from "services/localization/texts";

import headerLogo from "@/shared/ui/icons/bonuts_wordmark.png";

function pickStatusFromParams(params?: URLSearchParams): {
	status: string;
	code?: string;
	errorCode?: string;
} {
	if (!params) return { status: "loading" };

	const code = params.get("code") || undefined;

	// VK может вернуть разные поля, поэтому смотрим максимально терпимо
	const error = params.get("error") || params.get("error_type") || params.get("error_description") || undefined;

	if (code) return { status: "loading", code };
	if (error) {
		// Если пользователь отменил / запретил доступ
		const errorCode = params.get("error") || params.get("error_type") || "VK_OAUTH_ERROR";
		const cancelled =
			String(error).toLowerCase().includes("access_denied") ||
			String(error).toLowerCase().includes("cancel") ||
			String(error).toLowerCase().includes("denied");
		return { status: cancelled ? "cancelled" : "error", errorCode };
	}

	// если ничего нет — считаем технической ошибкой
	return { status: "error", errorCode: "VK_AUTH_00" };
}
export function VkCallbackPage() {
	const params = new URLSearchParams(window.location.search);
	const derived = React.useMemo(() => pickStatusFromParams(params), [params]);

	const [status, setStatus] = React.useState<string>(derived.status);
	const [errorCode, setErrorCode] = React.useState<string | undefined>(derived.errorCode);

	// Синхронизируемся при каждом открытии/смене params
	useEffect(() => {
		setStatus(derived.status);
		setErrorCode(derived.errorCode);
	}, [derived.status, derived.errorCode, open]);

	const ui = useMemo(() => {
		switch (status) {
			case "loading":
				return {
					title: "Подключаем VK…",
					description: "Проверяем доступ и создаём сессию. Обычно это занимает пару секунд.",
					showSpinner: true,
					actions: (
						<Stack direction="row" gap={1.5} justifyContent="center" flexWrap="wrap">
							<Button variant="text" onClick={window.close}>
								Отмена
							</Button>
						</Stack>
					),
					footer: "Не закрывайте это окно.",
				};

			case "success":
				return {
					title: "Готово!",
					description: "VK успешно подключён. Сейчас перенаправим вас в Bonuts.",
					showSpinner: true,
				};

			case "cancelled":
				return {
					title: "Подключение отменено",
					description: "Вы не дали доступ VK. Можете попробовать ещё раз.",
					showSpinner: false,
					actions: (
						<Stack direction="row" gap={1.5} justifyContent="center" flexWrap="wrap">
							<Button
								variant="contained"
								onClick={() => {
									// дефолт: просто обновить (если у вас редирект запускается из родительского окна)
									window.location.reload();
								}}
							>
								Попробовать снова
							</Button>
						</Stack>
					),
					footer: "Ничего не изменилось — доступ можно дать позже.",
				};

			case "error":
			default:
				return {
					title: "Не удалось подключить VK",
					description: "Похоже, произошла техническая ошибка. Попробуйте ещё раз.",
					showSpinner: false,
					actions: (
						<Stack direction="row" gap={1.5} justifyContent="center" flexWrap="wrap">
							<Button variant="contained" onClick={() => window.location.reload()}>
								Попробовать снова
							</Button>
							<Button variant="outlined" onClick={window.close}>
								Закрыть
							</Button>
						</Stack>
					),
				};
		}
	}, []);
	return (
		<Stack gap={2.5} alignItems="center" textAlign="center">
			{/* Header */}
			<Stack gap={1} alignItems="center">
				<Box sx={{ display: "grid", placeItems: "center" }}>{headerLogo}</Box>
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
}
