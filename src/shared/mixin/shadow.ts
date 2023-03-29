// SHADOWS
export const SHADOW_UMBRA = "0.2 !default";
export const SHADOW_PENUMBRA = "0.14 !default";
export const SHADOW_AMBIENT = "0.12 !default";

export const Shadows = {
	big: {
		boxShadow:
			` 0 9px 46px 8px rgba(0, 0, 0, ${SHADOW_PENUMBRA}),` +
			`    0 11px 15px -7px rgba(0, 0, 0,${SHADOW_AMBIENT}),` +
			`    0 24px 38px 3px rgba(0, 0, 0,${SHADOW_UMBRA})`,
	},
};
