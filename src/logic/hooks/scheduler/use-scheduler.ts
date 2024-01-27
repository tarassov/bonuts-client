import {
	DeleteDonutsSchedulersByIdApiResponse,
	PostDonutsSchedulersApiResponse,
} from "services/api/bonuts-api";
import { useCurrentTenant } from "logic/hooks/tenant/use-current-tenant";
import { useNotification } from "services/notification";
import { texts_s } from "services/localization/texts";
import { schedulersApi } from "services/api/extended/scheduler-api";
import { format } from "date-fns";
import { TScheduler } from "@/types/model/scheduler";

export const useScheduler = () => {
	const {
		usePostDonutsSchedulersMutation,
		usePatchDonutsSchedulersByIdMutation,
		useDeleteDonutsSchedulersByIdMutation,
	} = schedulersApi;
	const [postScheduler] = usePostDonutsSchedulersMutation();
	const [patchScheduler] = usePatchDonutsSchedulersByIdMutation();
	const [deleteSchedulerMutation] = useDeleteDonutsSchedulersByIdMutation();
	const tenant = useCurrentTenant();
	const { showNotification } = useNotification();

	const createScheduler = (
		args: Omit<TScheduler, "id">,
		options?: { onSuccess?: (result: PostDonutsSchedulersApiResponse) => void }
	) => {
		const { name, amount, every, comment } = args;
		if (tenant && name && amount && every && comment) {
			postScheduler({
				body: {
					tenant,
					...args,
					name: name.toString(),
					amount,
					every,
					comment,
					execute_time: args.execute_time
						? format(new Date(args.execute_time), "yyyy-MM-dd HH:mm")
						: "2000-01-01 00:00",
				},
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_s.scheduler_created);
				});
		} else {
			throw new Error("empty tenant or name");
		}
	};
	const updateScheduler = (
		args: Partial<TScheduler>,
		options?: { onSuccess?: (result: PostDonutsSchedulersApiResponse) => void }
	) => {
		const { name, amount, every, comment, id } = args;
		if (tenant && name && amount && every && comment && id) {
			patchScheduler({
				id: id?.toString(),
				body: {
					tenant,
					...args,
					name: name.toString(),
				},
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_s.scheduler_updated);
				});
		} else {
			throw new Error("empty tenant or name");
		}
	};

	const deleteScheduler = (
		schedulerId: number,
		options?: { onSuccess?: (result: DeleteDonutsSchedulersByIdApiResponse) => void }
	) => {
		if (tenant && schedulerId) {
			deleteSchedulerMutation({
				id: schedulerId?.toString(),
				tenant,
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_s.scheduler_deleted);
				});
		} else {
			throw new Error("empty tenant or name");
		}
	};
	return { createScheduler, updateScheduler, deleteScheduler };
};
