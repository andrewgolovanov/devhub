import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const TEMPLATE_CARD_WIDTH = {
  active: 576,
  inactive: 448,
  compactActive: 448,
  compactInactive: 344,
  desktopGap: 32,
  responsiveGap: 24,
};

export const TEMPLATE_CARD_WIDTH_TRANSITION = {
  duration: 0.5,
  ease: [0.17, -0.17, 0, 1],
} as const;

export const TEMPLATE_TRACK_TRANSITION = {
  duration: 0.55,
  ease: [0.17, -0.17, 0, 1],
} as const;

export function useTemplateSlider({
  itemCount,
  sectionRef,
}: {
  itemCount: number;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const shouldCancelCarouselClickRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const isCarouselPointerDownRef = useRef(false);
  const isDraggingCarouselRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shouldAnimateTrack, setShouldAnimateTrack] = useState(true);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [shouldUseCompactDesktopLayout, setShouldUseCompactDesktopLayout] =
    useState(false);
  const [shouldUseDesktopGap, setShouldUseDesktopGap] = useState(false);
  const [shouldUseDesktopLayout, setShouldUseDesktopLayout] = useState(false);
  const [shouldUseThreeCardLayout, setShouldUseThreeCardLayout] =
    useState(false);
  const [carouselViewportWidth, setCarouselViewportWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasCarouselMoved, setHasCarouselMoved] = useState(false);
  const [isAutoplayInViewport, setIsAutoplayInViewport] = useState(false);
  const [isBrowserTabActive, setIsBrowserTabActive] = useState(true);
  const [shouldAnimateCardWidth, setShouldAnimateCardWidth] = useState(false);
  const isCarouselMeasured = carouselViewportWidth > 0;
  const activeCarouselIndex = shouldUseThreeCardLayout
    ? selectedIndex + 1
    : selectedIndex;
  const maxSelectedIndex = Math.max(
    0,
    itemCount - (shouldUseThreeCardLayout ? 3 : 1),
  );
  const isPreviousSlideDisabled = selectedIndex <= 0;
  const isNextSlideDisabled = selectedIndex >= maxSelectedIndex;
  const viewportWidth =
    carouselViewportWidth ||
    (shouldUseDesktopLayout
      ? 1536
      : shouldUseCompactDesktopLayout
        ? 1216
        : shouldUseThreeCardLayout
          ? 704
          : 320);
  const shouldUseFixedCardWidths =
    shouldUseDesktopLayout || shouldUseCompactDesktopLayout;
  const cardGap = shouldUseDesktopGap
    ? TEMPLATE_CARD_WIDTH.desktopGap
    : TEMPLATE_CARD_WIDTH.responsiveGap;
  const inactiveCardWidth = shouldUseDesktopLayout
    ? TEMPLATE_CARD_WIDTH.inactive
    : shouldUseCompactDesktopLayout
      ? TEMPLATE_CARD_WIDTH.compactInactive
      : shouldUseThreeCardLayout
        ? Math.max((viewportWidth - cardGap * 2) / 2.5, 0)
        : viewportWidth * 0.78;
  const activeCardWidth = shouldUseDesktopLayout
    ? TEMPLATE_CARD_WIDTH.active
    : shouldUseCompactDesktopLayout
      ? TEMPLATE_CARD_WIDTH.compactActive
      : inactiveCardWidth;
  const cardStep = inactiveCardWidth + cardGap;
  const firstVisibleCardOffset = selectedIndex * cardStep;
  const trackX = -firstVisibleCardOffset + dragOffset;
  const dragThreshold = Math.min(cardStep * 0.22, 96);
  const dragActivationThreshold = 8;
  const shouldUseTwoFullCardsLayout =
    shouldUseThreeCardLayout && !shouldUseFixedCardWidths;

  const getCardWidth = useCallback(
    (isActive: boolean) =>
      shouldUseFixedCardWidths && isActive
        ? activeCardWidth
        : inactiveCardWidth,
    [activeCardWidth, inactiveCardWidth, shouldUseFixedCardWidths],
  );

  const handlePreviousSlide = useCallback(() => {
    setHasCarouselMoved(true);
    setShouldAnimateTrack(true);
    setSelectedIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  }, []);

  const handleNextSlide = useCallback(() => {
    setHasCarouselMoved(true);
    setShouldAnimateTrack(true);
    setSelectedIndex((currentIndex) =>
      Math.min(currentIndex + 1, maxSelectedIndex),
    );
  }, [maxSelectedIndex]);

  const handleCarouselPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      isCarouselPointerDownRef.current = true;
      isDraggingCarouselRef.current = false;
      shouldCancelCarouselClickRef.current = false;
      dragStartXRef.current = event.clientX;
      dragLastXRef.current = event.clientX;
      dragLastTimeRef.current = performance.now();

      setDragOffset(0);
    },
    [],
  );

  const handleCarouselPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isCarouselPointerDownRef.current) return;

      const nextDragOffset = event.clientX - dragStartXRef.current;

      if (
        !isDraggingCarouselRef.current &&
        Math.abs(nextDragOffset) < dragActivationThreshold
      ) {
        return;
      }

      if (!isDraggingCarouselRef.current) {
        isDraggingCarouselRef.current = true;
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        setShouldAnimateTrack(false);
        setHasCarouselMoved(true);
        setIsAutoplayPaused(true);
      }

      dragLastXRef.current = event.clientX;
      dragLastTimeRef.current = performance.now();
      setDragOffset(nextDragOffset);
    },
    [],
  );

  const finishCarouselDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isCarouselPointerDownRef.current) return;

      isCarouselPointerDownRef.current = false;

      if (!isDraggingCarouselRef.current) {
        return;
      }

      const finalOffset = event.clientX - dragStartXRef.current;
      const elapsedMs = Math.max(
        performance.now() - dragLastTimeRef.current,
        16,
      );
      const velocityX =
        ((event.clientX - dragLastXRef.current) / elapsedMs) * 1000;
      const isDraggedToNext = finalOffset < -dragThreshold || velocityX < -650;
      const isDraggedToPrevious =
        finalOffset > dragThreshold || velocityX > 650;

      isDraggingCarouselRef.current = false;
      shouldCancelCarouselClickRef.current = Math.abs(finalOffset) > 8;
      setDragOffset(0);
      setShouldAnimateTrack(true);

      if (isDraggedToNext) {
        setSelectedIndex((currentIndex) =>
          Math.min(currentIndex + 1, maxSelectedIndex),
        );
      } else if (isDraggedToPrevious) {
        setSelectedIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      }

      window.setTimeout(() => {
        shouldCancelCarouselClickRef.current = false;
        setIsAutoplayPaused(false);
      }, 180);
    },
    [dragThreshold, maxSelectedIndex],
  );

  const handleCarouselPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      finishCarouselDrag(event);
    },
    [finishCarouselDrag],
  );

  const handleCarouselPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      finishCarouselDrag(event);
    },
    [finishCarouselDrag],
  );

  const handleCarouselPointerLeave = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDraggingCarouselRef.current) {
        isCarouselPointerDownRef.current = false;
        return;
      }

      finishCarouselDrag(event);
    },
    [finishCarouselDrag],
  );

  const handleCarouselClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (!shouldCancelCarouselClickRef.current) return;

      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 100rem)");
    const compactDesktopQuery = window.matchMedia("(min-width: 80rem)");
    const desktopGapQuery = window.matchMedia("(min-width: 80.0625rem)");
    const threeCardQuery = window.matchMedia("(min-width: 48rem)");
    const updateDesktopLayout = () => {
      setShouldUseDesktopLayout(desktopQuery.matches);
      setShouldUseCompactDesktopLayout(
        compactDesktopQuery.matches && !desktopQuery.matches,
      );
      setShouldUseDesktopGap(desktopQuery.matches || desktopGapQuery.matches);
      setShouldUseThreeCardLayout(threeCardQuery.matches);
    };

    updateDesktopLayout();
    desktopQuery.addEventListener("change", updateDesktopLayout);
    compactDesktopQuery.addEventListener("change", updateDesktopLayout);
    desktopGapQuery.addEventListener("change", updateDesktopLayout);
    threeCardQuery.addEventListener("change", updateDesktopLayout);

    return () => {
      desktopQuery.removeEventListener("change", updateDesktopLayout);
      compactDesktopQuery.removeEventListener("change", updateDesktopLayout);
      desktopGapQuery.removeEventListener("change", updateDesktopLayout);
      threeCardQuery.removeEventListener("change", updateDesktopLayout);
    };
  }, []);

  useEffect(() => {
    const carouselViewport = carouselViewportRef.current;

    if (!carouselViewport) return;

    const updateCarouselViewportWidth = () => {
      const carouselViewportStyles = window.getComputedStyle(carouselViewport);

      setCarouselViewportWidth(
        carouselViewport.getBoundingClientRect().width -
          Number.parseFloat(carouselViewportStyles.paddingLeft) -
          Number.parseFloat(carouselViewportStyles.paddingRight),
      );
    };
    const carouselViewportObserver = new ResizeObserver(
      updateCarouselViewportWidth,
    );

    updateCarouselViewportWidth();
    carouselViewportObserver.observe(carouselViewport);

    return () => {
      carouselViewportObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      isAutoplayPaused ||
      !isAutoplayInViewport ||
      !isBrowserTabActive ||
      selectedIndex >= maxSelectedIndex
    ) {
      return;
    }

    const autoplayInterval = window.setInterval(handleNextSlide, 4000);

    return () => window.clearInterval(autoplayInterval);
  }, [
    handleNextSlide,
    isAutoplayInViewport,
    isAutoplayPaused,
    isBrowserTabActive,
    maxSelectedIndex,
    selectedIndex,
  ]);

  useEffect(() => {
    setSelectedIndex((currentIndex) =>
      Math.min(currentIndex, maxSelectedIndex),
    );
  }, [maxSelectedIndex]);

  useEffect(() => {
    if (!isCarouselMeasured) return;

    const animationFrameId = window.requestAnimationFrame(() => {
      setShouldAnimateCardWidth(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isCarouselMeasured]);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAutoplayInViewport(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    sectionObserver.observe(sectionElement);

    return () => {
      sectionObserver.disconnect();
    };
  }, [sectionRef]);

  useEffect(() => {
    const updateBrowserTabActive = () => {
      setIsBrowserTabActive(
        document.visibilityState === "visible" && document.hasFocus(),
      );
    };

    updateBrowserTabActive();
    document.addEventListener("visibilitychange", updateBrowserTabActive);
    window.addEventListener("focus", updateBrowserTabActive);
    window.addEventListener("blur", updateBrowserTabActive);

    return () => {
      document.removeEventListener("visibilitychange", updateBrowserTabActive);
      window.removeEventListener("focus", updateBrowserTabActive);
      window.removeEventListener("blur", updateBrowserTabActive);
    };
  }, []);

  return {
    activeCarouselIndex,
    cardGap,
    carouselViewportRef,
    getCardWidth,
    handleCarouselClickCapture,
    handleCarouselPointerCancel,
    handleCarouselPointerDown,
    handleCarouselPointerLeave,
    handleCarouselPointerMove,
    handleCarouselPointerUp,
    handleNextSlide,
    handlePreviousSlide,
    hasCarouselMoved,
    isCarouselMeasured,
    isNextSlideDisabled,
    isPreviousSlideDisabled,
    setIsAutoplayPaused,
    shouldAnimateCardWidth,
    shouldUseFixedCardWidths,
    shouldAnimateTrack,
    shouldUseThreeCardLayout,
    shouldUseTwoFullCardsLayout,
    trackX,
  };
}
