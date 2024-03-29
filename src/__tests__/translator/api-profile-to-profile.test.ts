import { cleanup } from "@testing-library/react";
import { GetProfileApiResponse } from "services/api/bonuts-api";
import { apiProfileAdaptor } from "services/adaptor/api-profile-adaptor";

const mockResponse: GetProfileApiResponse = {
	data: {
		id: "1",
		type: "profile",
		attributes: {
			active: false,
			admin: false,
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
			contact: "12312",
			circles: [],
			bio: "",
			birthdate: "2023-01-01",
			in_date: "2023-01-01",
		},
	},
};

describe("adaptor: apiProfileAdaptor", () => {
	afterAll(() => {
		cleanup();
	});

	test("Translates to profile", () => {
		const res = apiProfileAdaptor(mockResponse);
		expect(res).toBeTruthy();
		expect(res?.id).toEqual(1);
		expect(res?.admin).toEqual(false);
		expect(res?.user_name).toEqual("Тони Старк");
	});
});
