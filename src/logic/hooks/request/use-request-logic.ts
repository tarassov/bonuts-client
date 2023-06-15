import {
	PostRequestsActivateApiResponse,
	PostRequestsApiResponse,
	PostRequestsCloseApiResponse,
	PostRequestsRefundApiResponse,
	PostRequestsRollbackApiResponse,
	usePostRequestsActivateMutation,
	usePostRequestsCloseMutation,
	usePostRequestsMutation,
	usePostRequestsRefundMutation,
	usePostRequestsRollbackMutation,
} from "services/api/bonuts-api";
import { useAppSelector } from "services/redux/store/store";
import { authTenantSelector } from "services/redux/selectors/auth-selector";
import { useNotification } from "services/notification/use-notification";
import { texts_r } from "services/localization/texts/texts_r";
import { TDonut } from "@/types/model";

export const useRequestLogic = () => {
	const authTenant = useAppSelector(authTenantSelector);
	const [postRequest] = usePostRequestsMutation();
	const [postActivateRequest] = usePostRequestsActivateMutation();
	const [postRefundRequest] = usePostRequestsRefundMutation();
	const [postCloseRequest] = usePostRequestsCloseMutation();
	const [postRollbackRequest] = usePostRequestsRollbackMutation();
	const { showNotification } = useNotification();

	const createRequest = async (
		args: { donut: TDonut },
		options?: { onSuccess?: (result: PostRequestsApiResponse) => void }
	) => {
		const { donut } = args;
		if (authTenant) {
			postRequest({
				body: { donut_id: donut?.id, tenant: authTenant },
			})
				.unwrap()
				.then((result) => {
					options?.onSuccess?.(result);
					showNotification(texts_r.request_added);
				});
		}
	};

	const activateRequest = (
		id: number,
		options?: { onSuccess?: (result: PostRequestsActivateApiResponse) => void }
	) => {
		postActivateRequest({ body: { id, tenant: authTenant } })
			.unwrap()
			.then((result) => {
				options?.onSuccess?.(result);
				showNotification(texts_r.request_been_set_active);
			});
	};

	const refundRequest = (
		id: number,
		options?: { onSuccess?: (result: PostRequestsRefundApiResponse) => void }
	) => {
		postRefundRequest({ body: { id, tenant: authTenant } })
			.unwrap()
			.then((result) => {
				options?.onSuccess?.(result);
				showNotification(texts_r.request_has_been_refunded);
			});
	};
	const closeRequest = (
		id: number,
		options?: { onSuccess?: (result: PostRequestsCloseApiResponse) => void }
	) => {
		postCloseRequest({ body: { id, tenant: authTenant } })
			.unwrap()
			.then((result) => {
				options?.onSuccess?.(result);
				showNotification(texts_r.request_been_set_closed);
			});
	};
	const rollbackRequest = (
		id: number,
		options?: { onSuccess?: (result: PostRequestsRollbackApiResponse) => void }
	) => {
		postRollbackRequest({ body: { id, tenant: authTenant } })
			.unwrap()
			.then((result) => {
				options?.onSuccess?.(result);
				showNotification(texts_r.request_been_set_incoming);
			});
	};
	return { createRequest, activateRequest, refundRequest, closeRequest, rollbackRequest };
};
