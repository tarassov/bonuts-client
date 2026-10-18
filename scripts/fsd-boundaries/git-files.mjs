import { execSync } from "node:child_process";

import { PROJECT_ROOT } from "./constants.mjs";
import { isTsSource, uniq } from "./path-utils.mjs";

export function runGit(command) {
	try {
		return execSync(command, { cwd: PROJECT_ROOT, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8" }).trim();
	} catch {
		return "";
	}
}

export function getWorkingTreeFiles() {
	const staged = runGit("git diff --name-only --cached --diff-filter=ACMR").split("\n").filter(Boolean);
	const unstaged = runGit("git diff --name-only --diff-filter=ACMR").split("\n").filter(Boolean);
	const untracked = runGit("git ls-files --others --exclude-standard").split("\n").filter(Boolean);

	return uniq([...staged, ...unstaged, ...untracked])
		.filter(isTsSource)
		.sort();
}

export function getStagedFiles() {
	return uniq(runGit("git diff --name-only --cached --diff-filter=ACMR").split("\n").filter(Boolean)).filter(isTsSource).sort();
}

export function getCiChangedFiles() {
	const base = runGit("git rev-parse --verify HEAD~1");
	if (!base || base === runGit("git rev-parse HEAD")) {
		return [];
	}

	return uniq(runGit(`git diff --name-only --diff-filter=ACMR ${base}..HEAD`).split("\n").filter(Boolean))
		.filter(isTsSource)
		.sort();
}

export function getChangedFiles() {
	const committed = getCiChangedFiles();
	const workingTree = getWorkingTreeFiles();

	return uniq([...committed, ...workingTree])
		.filter(isTsSource)
		.sort();
}
