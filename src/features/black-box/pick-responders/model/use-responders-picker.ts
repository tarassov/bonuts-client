import { useCallback, useEffect, useMemo, useState } from "react";

import { useNotification } from "@/shared/ui/notification";

import { blackBoxTexts, type TBlackBoxProfile, useBlackBoxTenant, useGetBlackBoxRespondersQuery, usePutBlackBoxRespondersMutation } from "@/entities/black-box";

/** The admin edits the whole list locally and saves it at once, the same way the API replaces it. */
export const useRespondersPicker = () => {
	const tenant = useBlackBoxTenant();
	const { showNotification } = useNotification();
	const { data, isLoading } = useGetBlackBoxRespondersQuery({ tenant }, { skip: !tenant });
	const [saveResponders, { isLoading: isSaving }] = usePutBlackBoxRespondersMutation();
	const savedResponders = useMemo<Array<TBlackBoxProfile>>(() => data?.data ?? [], [data?.data]);
	const [selected, setSelected] = useState<Array<TBlackBoxProfile>>([]);

	useEffect(() => {
		setSelected(savedResponders);
	}, [savedResponders]);

	const save = useCallback(async () => {
		try {
			await saveResponders({ tenant, body: { profile_ids: selected.map((profile) => profile.id) } }).unwrap();
			showNotification(blackBoxTexts.responders_saved);
		} catch {
			// The rejected action is already reported by rtkErrorHandler; the local selection stays for another try.
		}
	}, [saveResponders, selected, showNotification, tenant]);

	const isChanged = useMemo(() => {
		const savedIds = savedResponders.map((profile) => profile.id).sort();
		const selectedIds = selected.map((profile) => profile.id).sort();

		return savedIds.join() !== selectedIds.join();
	}, [savedResponders, selected]);

	return { selected, setSelected, save, isLoading, isSaving, isChanged };
};
