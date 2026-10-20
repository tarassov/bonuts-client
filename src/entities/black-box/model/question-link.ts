import { routesPath } from "@/routes/config/routes-path";

export type TQuestionLinkSecret = { tenant: string; token: string };

const TENANT_PARAM = "tenant";
const TOKEN_PARAM = "token";

/** The secret goes into the hash: browsers never send it to a server, so it stays out of every access log. */
export const buildQuestionLink = (origin: string, { tenant, token }: TQuestionLinkSecret): string => {
	const hash = new URLSearchParams({ [TENANT_PARAM]: tenant, [TOKEN_PARAM]: token });

	return `${origin}${routesPath.BlackBoxQuestion}#${hash.toString()}`;
};

export const parseQuestionLinkHash = (hash: string): TQuestionLinkSecret | null => {
	const params = new URLSearchParams(hash.replace(/^#/, ""));
	const tenant = params.get(TENANT_PARAM);
	const token = params.get(TOKEN_PARAM);

	if (!tenant || !token) return null;

	return { tenant, token };
};
