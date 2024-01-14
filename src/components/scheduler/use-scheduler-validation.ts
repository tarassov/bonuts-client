import * as Yup from "yup";
import { texts_c, texts_m, texts_n, texts_t } from "services/localization/texts";
import { useBntTranslate } from "hooks/use-bnt-translate";
import { TScheduler } from "@/types/model/scheduler";

export const useSchedulerValidation = () => {
	const { translate } = useBntTranslate();
	const formSchema = Yup.object<TScheduler>().shape({
		name: Yup.string().required(translate(texts_n.name_is_required, { capitalize: true })),
		amount: Yup.number()
			.min(1, `${translate(texts_m.min_amount_is)} 1`)
			.max(10000, `${translate(texts_m.max_amount_is)} 10000`),
		comment: Yup.string().required(translate(texts_c.comment_is_required, { capitalize: true })),
		execute_time: Yup.string().required(translate(texts_t.time_is_required, { capitalize: true })),
	});

	return { formSchema };
};
