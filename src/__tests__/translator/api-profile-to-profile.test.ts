import { cleanup } from "@testing-library/react";
import { GetProfileApiResponse } from "../../services/api/bonuts-api";
import { apiProfileToProfile } from "../../services/translator/api-profile-to-profile";
import { TProfile } from "../../types/model";

const mockResponse: GetProfileApiResponse = {
	data: {
		id: "1",
		type: "profile",
		attributes: {
			active: undefined,
			admin: false,
			default: undefined,
			department: null,
			position: null,
			store_admin: undefined,
			attached: false,
			created_at: undefined,
			id: 1,
			roles: [],
			user_id: 1,
			first_name: "Тони",
			last_name: "Старк",
			email: "tony@bonuts.ru",
			sex: "unknown",
			name: "Тони Старк",
			user_avatar: { url: "", thumb: { url: "" }, preview: { url: "" } },
			logo: undefined,
			score_total: 0,
		},
	},
};

describe("translator: apiProfileToProfile", () => {
	afterAll(() => {
		cleanup();
	});

	test("Translates to profile", () => {
		const res = apiProfileToProfile(mockResponse);
		expect(res).toBeTruthy();
		expect(res?.id).toEqual(1);
		expect(res?.admin).toEqual(false);
		expect(res?.user_name).toEqual("Тони Старк");
	});
});
