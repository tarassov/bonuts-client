import { EFsdLayer, isAllowedSlicedSegment, isSpecialSlicedSegment } from "../constants.mjs";
import { parseTargetAlias } from "../import-rules.mjs";

export function noCrossSliceDeepImportRule({ relativePath, importPath, line }) {
	const target = parseTargetAlias(importPath);
	if (!target) {
		return [];
	}

	if (isSpecialSlicedSegment(target.segment)) {
		return [];
	}

	if (target.layer === EFsdLayer.shared && target.rest) {
		return [
			{
				rule: "no-cross-slice-deep-import",
				file: relativePath,
				line,
				importPath,
				message: `Cross-slice internal deep import "${importPath}" is forbidden. Import via that slice public API index.`,
			},
		];
	}

	if (isAllowedSlicedSegment(target.segment) && target.rest) {
		return [
			{
				rule: "no-cross-slice-deep-import",
				file: relativePath,
				line,
				importPath,
				message: `Cross-slice internal deep import "${importPath}" is forbidden. Import via that slice public API index.`,
			},
		];
	}

	return [];
}
