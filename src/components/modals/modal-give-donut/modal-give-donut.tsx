import { useMemo, useState } from "react";
import { ArrowBackRounded, CakeOutlined, SearchRounded } from "@mui/icons-material";
import { Alert, alpha, Button, CircularProgress, IconButton, InputAdornment, List, ListItemButton, ListItemText, TextField, useMediaQuery, useTheme } from "@mui/material";

import { BntBox } from "@/shared/ui/box";
import { type TDialogProps } from "@/shared/ui/dialog";
import { useNotification } from "@/shared/ui/notification";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { BntStack } from "@/shared/ui/stack";
import { BntTypography } from "@/shared/ui/typography";

import { useEmployeeList, useProfile } from "@/entities/profile";

import { TransferForm } from "@/components/transfer/transfer-form";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_b, texts_c, texts_d, texts_n, texts_r, texts_s } from "@/services/localization/texts";
import { emptyFunction } from "@/utils/empty-function";

enum GiveDonutStep {
	Search = "search",
	Transfer = "transfer",
	Success = "success",
}

type TSelectedEmployee = {
	id: number;
	name: string;
};

export function ModalGiveDonut({ close = emptyFunction }: TDialogProps) {
	const [step, setStep] = useState<GiveDonutStep>(GiveDonutStep.Search);
	const [query, setQuery] = useState("");
	const [selectedEmployee, setSelectedEmployee] = useState<TSelectedEmployee | null>(null);

	const theme = useTheme();
	const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { t } = useBntTranslate();
	const { showGeneralError } = useNotification();
	const { profile } = useProfile();
	const { objects: employees = [], isLoading } = useEmployeeList({ searchText: query || undefined });

	const colleagueList = useMemo(() => {
		return employees.filter((employee) => employee.id !== profile?.id);
	}, [employees, profile?.id]);

	const handleBackToSearch = () => {
		setStep(GiveDonutStep.Search);
	};

	const handleEmployeeSelect = (employee: TSelectedEmployee) => {
		setSelectedEmployee(employee);
		setStep(GiveDonutStep.Transfer);
	};

	const handleTransferSuccess = () => {
		setStep(GiveDonutStep.Success);
	};

	const handleTransferError = () => {
		showGeneralError();
	};

	return (
		<BntBox
			sx={{
				m: 3,
				minHeight: 400,
				minWidth: matchesDownSm ? undefined : 450,
			}}
		>
			{step === GiveDonutStep.Search ? (
				<BntStack gap={2}>
					<TextField
						autoFocus
						fullWidth
						size="small"
						placeholder={t(texts_s.search_colleagues)}
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchRounded fontSize="small" />
								</InputAdornment>
							),
						}}
					/>
					{isLoading ? (
						<BntStack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
							<CircularProgress size={24} />
						</BntStack>
					) : colleagueList.length ? (
						<List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
							{colleagueList.map((employee) => {
								const displayName = employee.name || employee.user_name || t(texts_n.no_name);

								return (
									<ListItemButton
										key={employee.id}
										onClick={() =>
											handleEmployeeSelect({
												id: employee.id,
												name: displayName,
											})
										}
										sx={{
											borderRadius: 3,
											border: `1px solid ${theme.palette.divider}`,
											px: 1.25,
											py: 1,
											backgroundColor: theme.palette.background.paper,
											transition: theme.transitions.create(["border-color", "background-color", "transform"]),
											"&:hover": {
												borderColor: theme.palette.primary.main,
												backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.06),
												transform: "translateY(-1px)",
											},
										}}
									>
										<ProfileAvatar avatarUrl={employee.user_avatar?.thumb?.url || employee.user_avatar?.url} name={displayName} />
										<ListItemText sx={{ ml: 1.5 }} primary={displayName} secondary={employee.position || undefined} primaryTypographyProps={{ fontWeight: 600 }} />
									</ListItemButton>
								);
							})}
						</List>
					) : (
						<Alert severity="info" variant="outlined">
							{t(texts_n.no_colleagues_found, { capitalize: true })}
						</Alert>
					)}
				</BntStack>
			) : null}

			{step === GiveDonutStep.Transfer && selectedEmployee ? (
				<BntStack gap={2}>
					<BntStack direction="row" alignItems="center" gap={1}>
						<IconButton aria-label={t(texts_b.back, { capitalize: true })} onClick={handleBackToSearch} size="small">
							<ArrowBackRounded fontSize="small" />
						</IconButton>
						<BntTypography color="text.secondary" variant="body2">
							{t(texts_s.sending_to, { capitalize: true })} <strong>{selectedEmployee.name}</strong>
						</BntTypography>
					</BntStack>
					<TransferForm id={selectedEmployee.id} onSuccess={handleTransferSuccess} onError={handleTransferError} />
				</BntStack>
			) : null}

			{step === GiveDonutStep.Success && selectedEmployee ? (
				<BntStack alignItems="center" justifyContent="center" gap={2} sx={{ minHeight: 320, textAlign: "center" }}>
					<BntBox
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: 72,
							height: 72,
							borderRadius: "50%",
							background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.24)}, ${alpha(theme.palette.primary.main, 0.08)})`,
							color: theme.palette.primary.main,
						}}
					>
						<CakeOutlined sx={{ fontSize: 36 }} />
					</BntBox>
					<BntTypography variant="h5">{t(texts_d.donuts_sent, { capitalize: true })}</BntTypography>
					<BntTypography color="text.secondary" sx={{ maxWidth: 320 }}>
						{t(texts_r.recognition_sent, { capitalize: true })}
					</BntTypography>
					<Button variant="contained" onClick={() => close()}>
						{t(texts_c.close, { capitalize: true })}
					</Button>
				</BntStack>
			) : null}
		</BntBox>
	);
}
