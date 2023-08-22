import { TBaseModel } from "@/types/model/base-model";
import { TPicture } from "@/types/model/picture";

export type TTenant = TBaseModel & {
	name: string;
	caption?: string;
	active: boolean;
	created_at: string;
	updated_at: string;
	domain: string;
	demo: boolean;
	logo: TPicture;
	welcome_points: number;
	welcome_donuts: number;
	email_notification: boolean;
	birthday_donuts: number;
	birthday_points: number;
	join_to_project_donuts: number;
	join_to_company_donuts: number;
	join_to_project_points: number;
	join_to_company_points: number;
	use_departments: boolean;
	test?: boolean;
};
