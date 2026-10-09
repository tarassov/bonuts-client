import type { ChangeEvent } from "react";
import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { texts_s } from "@/services/localization/texts";

interface IModalGiveDonutSearchFieldProps {
	query: string;
	onQueryChange: (query: string) => void;
}

export function ModalGiveDonutSearchField({ query, onQueryChange }: IModalGiveDonutSearchFieldProps) {
	const { t } = useBntTranslate();

	const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		onQueryChange(event.target.value);
	};

	return (
		<TextField
			autoFocus
			fullWidth
			size="small"
			placeholder={t(texts_s.search_colleagues)}
			value={query}
			onChange={handleQueryChange}
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<SearchRounded fontSize="small" />
						</InputAdornment>
					),
				},
			}}
		/>
	);
}
