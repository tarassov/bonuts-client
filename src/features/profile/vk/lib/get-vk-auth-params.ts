import {
	BASE_CHARS,
	BASE_URL,
	VK_APP_ID,
	VK_CHALLENGE_METHOD,
	VK_CODE_LENGTH,
	VK_REDIRECT_URI,
	VK_RESPONSE_TYPE,
	VK_SCOPES,
} from "../constants/vk-constants";

function generateRandomString(length = VK_CODE_LENGTH) {
	let result = "";
	const randomValues = crypto.getRandomValues(new Uint8Array(length));

	randomValues.forEach((val) => {
		result += BASE_CHARS[val % BASE_CHARS.length];
	});

	return result;
}

// SHA256 + base64url
async function generateCodeChallenge(codeVerifier: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await crypto.subtle.digest("SHA-256", data);

	return btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

export async function getVkAuthParams() {
	const codeVerifier = generateRandomString(64);
	const state = generateRandomString(32);

	const codeChallenge = await generateCodeChallenge(codeVerifier);

	const params = new URLSearchParams({
		response_type: VK_RESPONSE_TYPE,
		client_id: VK_APP_ID,
		redirect_uri: VK_REDIRECT_URI,
		code_challenge: codeChallenge,
		code_challenge_method: VK_CHALLENGE_METHOD,
		state: state,
		scope: VK_SCOPES,
	});

	return {
		url: `${BASE_URL}?${params.toString()}`,
		codeVerifier,
		state,
	};
}
