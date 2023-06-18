import { useCreateDonutMutation } from "services/api/form-data-api";
import { useProfileLogic } from "logic/hooks/profile/use-profile-logic";
import { PostDonutsApiResponse } from "services/api/bonuts-api";

export const useCreateDonut = () => {
	const [createDonut] = useCreateDonutMutation();
	const { profile } = useProfileLogic();
	const postDonut = (args: {
		logo?: File;
		price: number;
		name: string;
	}): Promise<{ data: PostDonutsApiResponse } | { error: any } | undefined> | undefined => {
		const { logo, price, name } = args;
		if (profile?.tenant) {
			const formPayLoad = new FormData();
			if (logo) formPayLoad.append("logo", logo);
			formPayLoad.append("tenant", profile.tenant);
			formPayLoad.append("price", price.toString());
			formPayLoad.append("name", name);
			return createDonut(formPayLoad);
		}
		return undefined;
	};

	return { postDonut };
};
