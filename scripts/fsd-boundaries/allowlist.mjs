import fs from "node:fs";

import { ALLOWLIST_PATH } from "./constants.mjs";

export function loadAllowlist() {
	if (!fs.existsSync(ALLOWLIST_PATH)) {
		return { violations: [] };
	}

	try {
		const raw = fs.readFileSync(ALLOWLIST_PATH, "utf8");
		const parsed = JSON.parse(raw);
		if (!parsed || !Array.isArray(parsed.violations)) {
			return { violations: [] };
		}
		return parsed;
	} catch {
		return { violations: [] };
	}
}

export function isViolationAllowed(violation, allowlist) {
	for (const item of allowlist.violations) {
		if (!item || typeof item !== "object") {
			continue;
		}
		if (item.rule !== violation.rule || item.file !== violation.file) {
			continue;
		}
		if (item.importPath && item.importPath !== violation.importPath) {
			continue;
		}
		return true;
	}
	return false;
}
