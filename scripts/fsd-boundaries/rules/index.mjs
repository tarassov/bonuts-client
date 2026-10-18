import { noAbsoluteSameSliceSegmentImportRule } from "./no-absolute-same-slice-segment-import.mjs";
import { noCrossSliceDeepImportRule } from "./no-cross-slice-deep-import.mjs";
import { noLegacyBareAliasRule } from "./no-legacy-bare-alias.mjs";
import { noInvalidSliceSegmentStructureRule } from "./no-invalid-slice-segment-structure.mjs";
import { noPageDirectFileImportRule } from "./no-page-direct-file-import.mjs";

const IMPORT_RULES = [noLegacyBareAliasRule, noCrossSliceDeepImportRule, noAbsoluteSameSliceSegmentImportRule, noPageDirectFileImportRule];
const FILE_RULES = [noInvalidSliceSegmentStructureRule];

export function collectViolationsForImport(context) {
	return IMPORT_RULES.flatMap((rule) => rule(context));
}

export function collectViolationsForFile(context) {
	return FILE_RULES.flatMap((rule) => rule(context));
}
