import fs from "node:fs";
import path from "node:path";
import { ALLOWLIST_PATH, PROJECT_ROOT } from "./constants.mjs";
import { loadAllowlist, isViolationAllowed } from "./allowlist.mjs";
import { getChangedFiles, getCiChangedFiles, getStagedFiles, getWorkingTreeFiles } from "./git-files.mjs";
import { extractImportSpecifiers, getLineByIndex, parseSourceMeta } from "./import-rules.mjs";
import { toPosix } from "./path-utils.mjs";
import { collectViolationsForFile, collectViolationsForImport } from "./rules/index.mjs";
import { getAllTsSourceFiles } from "./source-files.mjs";

export function resolveFilesFromArgs(args) {
	if (args.includes("--staged")) {
		return getStagedFiles();
	}
	if (args.includes("--working-tree")) {
		return getWorkingTreeFiles();
	}
	if (args.includes("--ci-changed")) {
		return getCiChangedFiles();
	}
	if (args.includes("--changed")) {
		return getChangedFiles();
	}
	return getAllTsSourceFiles();
}

export function validateFiles(filesToValidate) {
	const allowlist = loadAllowlist();
	const violations = [];

	for (const relativePath of filesToValidate) {
		const absolutePath = path.join(PROJECT_ROOT, relativePath);
		if (!fs.existsSync(absolutePath)) {
			continue;
		}

		const source = fs.readFileSync(absolutePath, "utf8");
		const sourceMeta = parseSourceMeta(relativePath);
		const imports = extractImportSpecifiers(source);
		violations.push(
			...collectViolationsForFile({
				sourceMeta,
				relativePath,
			})
		);

		for (const item of imports) {
			const line = getLineByIndex(source, item.index);
			violations.push(
				...collectViolationsForImport({
					sourceMeta,
					relativePath,
					importPath: item.importPath,
					line,
				})
			);
		}
	}

	return violations.filter((item) => !isViolationAllowed(item, allowlist));
}

export function formatViolation(violation) {
	return `${violation.file}:${violation.line}:1 [${violation.rule}] ${violation.message}`;
}

export function getAllowlistRelativePath() {
	return toPosix(path.relative(PROJECT_ROOT, ALLOWLIST_PATH));
}
