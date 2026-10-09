import { useMemo, useState } from "react";

import { useModal } from "@/shared/lib/modal";
import { useLoader } from "@/shared/ui/loader";

import { getVisibleCircles } from "./circles-page-presenter";
import { Modules } from "@/constants/modules";
import { useBntTranslate } from "@/hooks/use-bnt-translate";
import { useCircle } from "@/logic/hooks/cirlce/use-circle";
import { useCircleLoaderList } from "@/logic/hooks/cirlce/use-circle-loader-list";
import { useCircleUi } from "@/logic/ui/use-circle-ui";
import { texts_a, texts_c, texts_e } from "@/services/localization/texts";

export function useCirclesPage() {
	const { objects: circles, isLoading } = useCircleLoaderList();
	const { deleteCircle } = useCircle();
	const { showCreateCircleModal } = useCircleUi();
	const { ConfirmationModal, EditCircle } = useModal();
	const { t } = useBntTranslate();
	const [query, setQuery] = useState("");
	const filteredCircles = useMemo(() => getVisibleCircles(circles, query), [circles, query]);

	useLoader(Modules.Circles, isLoading);

	const handleDelete = (id: number) => {
		ConfirmationModal.show({
			text: t(texts_a.are_you_sure_to_delete, { capitalize: true }),
			onSubmit: () => deleteCircle(id),
			title: t(texts_c.confirmation, { capitalize: true }),
		});
	};

	const handleEdit = (id: number) => {
		EditCircle.show({
			title: t(texts_e.edit_circle),
			circleId: id,
		});
	};

	return {
		circles,
		filteredCircles,
		handleCreate: showCreateCircleModal,
		handleDelete,
		handleEdit,
		query,
		setQuery,
	};
}
