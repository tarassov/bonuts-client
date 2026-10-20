import { keyframes } from "@mui/material/styles";

/** Keyframes of the black box chest; every animation runs over CHEST_ANIMATION_MS, see chest-animation.tsx. */
export const overlayFade = keyframes`
	0% { opacity: 0; }
	6% { opacity: 1; }
	91% { opacity: 1; }
	100% { opacity: 0; }
`;

export const chestShake = keyframes`
	0%, 100% { transform: rotate(0); }
	20% { transform: rotate(-3deg); }
	40% { transform: rotate(3deg); }
	60% { transform: rotate(-2deg); }
	80% { transform: rotate(1deg); }
`;

export const lidOpen = keyframes`
	0%, 25% { transform: perspective(500px) rotateX(0deg); }
	40% { transform: perspective(500px) rotateX(118deg); }
	46%, 100% { transform: perspective(500px) rotateX(108deg); }
`;

export const lidClose = keyframes`
	0%, 31% { transform: perspective(500px) rotateX(108deg); }
	45% { transform: perspective(500px) rotateX(-4deg); }
	49%, 100% { transform: perspective(500px) rotateX(0deg); }
`;

export const glowIn = keyframes`
	0%, 26% { opacity: 0; transform: translateX(-50%) scale(0.3); }
	45% { opacity: 1; transform: translateX(-50%) scale(1.1); }
	100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
`;

export const glowOut = keyframes`
	0% { opacity: 0.8; transform: translateX(-50%) scale(1); }
	39% { opacity: 0.6; }
	49%, 100% { opacity: 0; transform: translateX(-50%) scale(0.3); }
`;

export const cardRise = keyframes`
	0%, 31% { opacity: 0; transform: translate(-50%, 60px) scale(0.5); }
	53% { opacity: 1; transform: translate(-50%, -12px) scale(1.03); }
	59%, 100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
`;

/** The card stays above the lid and dissolves into the opening while the lid starts closing (lidClose 31%–45%). */
export const cardDrop = keyframes`
	0% { opacity: 0; transform: translate(-50%, -80px) scale(1); }
	11%, 20% { opacity: 1; transform: translate(-50%, -40px) scale(1); }
	31% { opacity: 1; transform: translate(-50%, 30px) scale(0.6); }
	37%, 100% { opacity: 0; transform: translate(-50%, 60px) scale(0.4); }
`;

export const lockPop = keyframes`
	0%, 46% { transform: scale(1); }
	54% { transform: scale(1.25); }
	62%, 100% { transform: scale(1); }
`;

export const captionIn = keyframes`
	0%, 48% { opacity: 0; transform: translateY(8px); }
	60%, 100% { opacity: 1; transform: translateY(0); }
`;
