#!/usr/bin/env node

import { formatViolation, getAllowlistRelativePath, resolveFilesFromArgs, validateFiles } from "./fsd-boundaries/checker.mjs";

const filesToValidate = resolveFilesFromArgs(process.argv.slice(2));

if (filesToValidate.length === 0) {
	// biome-ignore lint/suspicious/noConsole: <allow console>
	console.log("FSD boundaries: no files to validate.");
	process.exit(0);
}

const violations = validateFiles(filesToValidate);
if (violations.length === 0) {
	// biome-ignore lint/suspicious/noConsole: <allow console>
	console.log(`FSD boundaries: OK (${filesToValidate.length} files checked).`);
	process.exit(0);
}

console.error(`FSD boundaries: ${violations.length} violation(s) found.`);
for (const violation of violations) {
	console.error(formatViolation(violation));
}

console.error(`\nAllowlist file: ${getAllowlistRelativePath()}`);
process.exit(1);
