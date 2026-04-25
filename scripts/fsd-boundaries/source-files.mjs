import fs from "node:fs";
import path from "node:path";

import { PROJECT_ROOT, SRC_ROOT } from "./constants.mjs";
import { toPosix, uniq } from "./path-utils.mjs";

export function getAllTsSourceFiles() {
	const result = [];
	const queue = [SRC_ROOT];

	while (queue.length > 0) {
		const current = queue.pop();
		if (!current || !fs.existsSync(current)) {
			continue;
		}

		const stat = fs.statSync(current);
		if (stat.isFile()) {
			if (current.endsWith(".ts") || current.endsWith(".tsx")) {
				result.push(toPosix(path.relative(PROJECT_ROOT, current)));
			}
			continue;
		}

		const entries = fs.readdirSync(current, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.name === "node_modules") {
				continue;
			}
			queue.push(path.join(current, entry.name));
		}
	}

	return uniq(result).sort();
}
