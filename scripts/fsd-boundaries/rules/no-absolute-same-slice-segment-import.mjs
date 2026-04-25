import { isAllowedSlicedSegment, isSpecialSlicedSegment } from "../constants.mjs";
import { parseTargetAlias } from "../import-rules.mjs";

export function noAbsoluteSameSliceSegmentImportRule({ sourceMeta, relativePath, importPath, line }) {
	const target = parseTargetAlias(importPath);
	if (!target) {
		return [];
	}

	if (!sourceMeta?.isSlicedLayer) {
		return [];
	}

	const isSameLayer = sourceMeta.layer === target.layer;
	const isSameSlice = sourceMeta.sliceKey === target.sliceKey;
	if (!isSameLayer || !isSameSlice || !sourceMeta.segment) {
		return [];
	}

	if (isSpecialSlicedSegment(target.segment)) {
		return [];
	}

	if (isAllowedSlicedSegment(target.segment)) {
		return [
			{
				rule: "no-absolute-same-slice-segment-import",
				file: relativePath,
				line,
				importPath,
				message: `Same-slice segment import "${importPath}" must be relative inside one slice.`,
			},
		];
	}

	return [];
}
