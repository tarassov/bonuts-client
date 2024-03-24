import { BntReactTable } from "shared/react-table/bnt-react-table";
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import { BntBox } from "shared/box/bnt-box";
import classNames from "classnames";
import { BntCard } from "shared/card/card";
import { BntTypography } from "shared/typography/typography";
import { CloseOutlined, FullscreenOutlined } from "@mui/icons-material";
import { BntIconButton } from "shared/icon-button/bnt-icon-button";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { emptyFunction } from "utils/empty-function";
import { texts_c } from "services/localization/texts";
import { Currency } from "constants/currency";
import { TProfile } from "@/types/model";
import { useStatisticsTableConfig } from "@/features/reports/component/statistic/use-statistics-table-config";
import reportsTexts from "@/features/reports/localization/reports-texts";
import { BntCardBody } from "@/shared/card/card-body";

export type StatisticsTileProps = {
	totalFieldName: string;
	fullscreen?: boolean;
	onFullScreenOpen?: VoidFunction;
	onFullScreenExit?: VoidFunction;
	data?: Array<TProfile>;
	onlyHeader?: boolean;
	isLoading?: boolean;
	className?: string;
	currency?: Currency;
};
export const StatisticsTile: FC<StatisticsTileProps> = ({
	totalFieldName,
	data,
	isLoading = [],
	className,
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
			<BntCardBody className="flex-grow overflow-hidden pl-2 pr-2">
				{isLoading ? (
					<CircularProgress color="inherit" />
				) : (
					<BntBox className="height-100 scroll">
						<BntReactTable
							columns={tableConfig}
							data={onlyHeader ? [] : data || []}
							isVirtual
							estimateSize={40}
							noHeaders
						/>
					</BntBox>
				)}
			</BntCardBody>
		</BntCard>
	);
};
