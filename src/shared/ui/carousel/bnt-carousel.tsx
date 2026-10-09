import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

import { CarouselControlButton, CarouselControls, CarouselRoot, CarouselViewport } from "./bnt-carousel.styles";

interface IBntCarouselProps {
	ariaLabel: string;
	children: ReactNode;
	className?: string;
	dataTestId?: string;
	nextLabel: string;
	previousLabel: string;
}

export function BntCarousel({ ariaLabel, children, className, dataTestId, nextLabel, previousLabel }: IBntCarouselProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const [canScrollBackward, setCanScrollBackward] = useState(false);
	const [canScrollForward, setCanScrollForward] = useState(false);

	const updateControls = useCallback(() => {
		const viewport = viewportRef.current;

		if (!viewport) return;

		setCanScrollBackward(viewport.scrollLeft > 0);
		setCanScrollForward(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1);
	}, []);

	useEffect(() => {
		const viewport = viewportRef.current;

		if (!viewport) return undefined;

		const resizeObserver = new ResizeObserver(updateControls);
		resizeObserver.observe(viewport);
		viewport.addEventListener("scroll", updateControls, { passive: true });
		updateControls();

		return () => {
			resizeObserver.disconnect();
			viewport.removeEventListener("scroll", updateControls);
		};
	}, [updateControls]);

	const scrollCarousel = (direction: "backward" | "forward") => {
		const viewport = viewportRef.current;

		if (!viewport) return;

		const distance = viewport.clientWidth * 0.8;
		viewport.scrollBy({ behavior: "smooth", left: direction === "forward" ? distance : -distance });
	};

	return (
		<CarouselRoot aria-label={ariaLabel} className={className} data-testid={dataTestId}>
			<CarouselViewport ref={viewportRef}>{children}</CarouselViewport>
			{canScrollBackward || canScrollForward ? (
				<CarouselControls>
					<CarouselControlButton aria-label={previousLabel} disabled={!canScrollBackward} onClick={() => scrollCarousel("backward")}>
						<ChevronLeftRounded />
					</CarouselControlButton>
					<CarouselControlButton aria-label={nextLabel} disabled={!canScrollForward} onClick={() => scrollCarousel("forward")}>
						<ChevronRightRounded />
					</CarouselControlButton>
				</CarouselControls>
			) : null}
		</CarouselRoot>
	);
}
