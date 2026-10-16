import * as React from "react";
import { FC } from "react";
import { CloseOutlined, FullscreenOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import classNames from "classnames";

import { Currency } from "constants/currency";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { texts_c } from "services/localization/texts";
import { emptyFunction } from "utils/empty-function";

import { BntBox } from "@/shared/ui/box";
import { BntCard, BntCardBody } from "@/shared/ui/card";
import { BntIconButton } from "@/shared/ui/icon-button";
import { BntReactTable } from "@/shared/ui/react-table";
import { BntTypography } from "@/shared/ui/typography";

import reportsTexts from "../config/reports-texts";

import { useStatisticsTableConfig } from "./use-statistics-table-config";
import { TProfile } from "@/types/model";

export type StatisticsTileProps = {
	totalFieldName: string;
	fullscreen?: boolean;
	onFullScreenOpen?: VoidFunction;
	onFullScreenExit?: VoidFunction;
	data?: Array<TProfile>;
	onlyHeader?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	hasNext?: boolean;
	fetchNext?: VoidFunction;
	className?: string;
	currency?: Currency;
};
export const StatisticsTile: FC<StatisticsTileProps> = ({
	totalFieldName,
	data,
	isLoading = [],
	className,
	fetchNext,
	hasNext,
	isFetching,
	onFullScreenExit = emptyFunction,
	onFullScreenOpen = emptyFunction,
	fullscreen,
	currency,
	onlyHeader,
}) => {
	const { tableConfig } = useStatisticsTableConfig(totalFieldName, currency);
	const { t } = useBntTranslate();
	return (
		<BntCard
			className={classNames(className, "height-100 d-flex flex-column width-100 p-2", {
				pointer: onlyHeader,
			})}
			onClick={(e) => {
				onFullScreenOpen();
				e.stopPropagation();
			}}
		>
			<BntBox className="d-flex width-100 flex-row justify-content-between pl-2">
				<BntTypography className="p-1" color="secondary">
					{totalFieldName}
				</BntTypography>
				{!onlyHeader && (
					<BntIconButton
						tooltip={fullscreen ? t(texts_c.close) : t(reportsTexts.fullsize)}
						className="p-1"
						onClick={(e) => {
							if (fullscreen) {
								onFullScreenExit();
							} else {
								onFullScreenOpen();
							}
							if (!onlyHeader) e.stopPropagation();
						}}
					>
						{fullscreen ? <CloseOutlined /> : <FullscreenOutlined />}
					</BntIconButton>
				)}
			</BntBox>
			<BntCardBody className="flex-grow overflow-hidden pl-2 pr-2" onClick={(e) => e.stopPropagation()}>
				{isLoading ? (
					<CircularProgress color="inherit" />
				) : (
					<BntBox className="height-100 scroll">
						<BntReactTable columns={tableConfig} data={onlyHeader ? [] : data || []} fetchNext={fetchNext} hasNext={hasNext} isFetching={isFetching} isVirtual estimateSize={40} noHeaders />
					</BntBox>
				)}
			</BntCardBody>
		</BntCard>
	);
};
