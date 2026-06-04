import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const TEMPLATE_CARD_WIDTH = {
  active: 576,
  inactive: 448,
  compactActive: 448,
  compactInactive: 344,
  desktopGap: 32,
  responsiveGap: 24,
};

const TEMPLATE_CARD_WIDTH_TRANSITION = {
  duration: 1.6,
  ease: [0.17, -0.17, 0, 1],
} as const;

const TEMPLATE_TRACK_TRANSITION = {
  duration: 0.2,
  ease: [0.17, -0.17, 0, 1],
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export type TemplateSliderSettings = {
  activeWidth: number;
  inactiveWidth: number;
  compactActiveWidth: number;
  compactInactiveWidth: number;
  desktopGap: number;
  responsiveGap: number;
  trackDuration: number;
  inactiveClickDuration: number;
  cardDuration: number;
  cardResizeDuration: number;
  textWidthDuration: number;
  autoplayInterval: number;
  viewportThreshold: number;
};

export const DEFAULT_TEMPLATE_SLIDER_SETTINGS: TemplateSliderSettings = {
  activeWidth: TEMPLATE_CARD_WIDTH.active,
  inactiveWidth: TEMPLATE_CARD_WIDTH.inactive,
  compactActiveWidth: TEMPLATE_CARD_WIDTH.compactActive,
  compactInactiveWidth: TEMPLATE_CARD_WIDTH.compactInactive,
  desktopGap: TEMPLATE_CARD_WIDTH.desktopGap,
  responsiveGap: TEMPLATE_CARD_WIDTH.responsiveGap,
  trackDuration: TEMPLATE_TRACK_TRANSITION.duration,
  inactiveClickDuration: 0.5,
  cardDuration: TEMPLATE_CARD_WIDTH_TRANSITION.duration,
  cardResizeDuration: 0.2,
  textWidthDuration: 0,
  autoplayInterval: 4000,
  viewportThreshold: 0.35,
};

export function useTemplateSlider({
  itemCount,
  sectionRef,
  settings = DEFAULT_TEMPLATE_SLIDER_SETTINGS,
}: {
  itemCount: number;
  sectionRef: RefObject<HTMLElement | null>;
  settings?: TemplateSliderSettings;
}) {
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const shouldCancelCarouselClickRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const isCarouselPointerDownRef = useRef(false);
  const isDraggingCarouselRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shouldAnimateTrack, setShouldAnimateTrack] = useState(true);
  const [trackDuration, setTrackDuration] = useState(settings.trackDuration);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [hasManualInteraction, setHasManualInteraction] = useState(false);
  const [shouldUseCompactDesktopLayout, setShouldUseCompactDesktopLayout] =
    useState(false);
  const [shouldUseDesktopGap, setShouldUseDesktopGap] = useState(false);
  const [shouldUseDesktopLayout, setShouldUseDesktopLayout] = useState(false);
  const [shouldUseThreeCardLayout, setShouldUseThreeCardLayout] =
    useState(false);
  const [carouselViewportWidth, setCarouselViewportWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const [hasCarouselMoved, setHasCarouselMoved] = useState(false);
  const [isAutoplayInViewport, setIsAutoplayInViewport] = useState(false);
  const [isBrowserTabActive, setIsBrowserTabActive] = useState(true);
  const isCarouselMeasured = carouselViewportWidth > 0;
  const maxSelectedIndex = Math.max(0, itemCount - 1);
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
    ? settings.desktopGap
    : settings.responsiveGap;
  const inactiveCardWidth = shouldUseDesktopLayout
    ? settings.inactiveWidth
    : shouldUseCompactDesktopLayout
      ? settings.compactInactiveWidth
      : shouldUseThreeCardLayout
        ? Math.max((viewportWidth - cardGap * 2) / 2.5, 0)
        : viewportWidth * 0.72;
  const activeCardWidth = shouldUseDesktopLayout
    ? settings.activeWidth
    : shouldUseCompactDesktopLayout
      ? settings.compactActiveWidth
      : inactiveCardWidth;
  const cardStep = inactiveCardWidth + cardGap;
  const trackWidth =
    (itemCount - 1) * inactiveCardWidth +
    activeCardWidth +
    (itemCount - 1) * cardGap;
  const minTrackX = Math.min(viewportWidth - trackWidth, 0);
  const getTrackXForActiveIndex = useCallback(
    (activeIndex: number) => {
      const cardCenterX = activeIndex * cardStep + activeCardWidth / 2;
      const desiredTrackX = viewportWidth / 2 - cardCenterX;

      return clamp(desiredTrackX, minTrackX, 0);
    },
    [activeCardWidth, cardStep, minTrackX, viewportWidth],
  );
  const baseTrackX = getTrackXForActiveIndex(selectedIndex);
  const trackX = baseTrackX + dragOffset;
  const getCenterActiveIndex = useCallback(
    (trackOffsetX: number) => {
      const viewportCenterX = viewportWidth / 2;
      const rawCenterIndex = Math.round(
        (viewportCenterX - trackOffsetX - activeCardWidth / 2) / cardStep,
      );

      return clamp(rawCenterIndex, 0, maxSelectedIndex);
    },
    [activeCardWidth, cardStep, maxSelectedIndex, viewportWidth],
  );
  const activeCarouselIndex = isDraggingCarousel
    ? getCenterActiveIndex(trackX)
    : selectedIndex;
  const isPreviousSlideDisabled = activeCarouselIndex <= 0;
  const isNextSlideDisabled = activeCarouselIndex >= maxSelectedIndex;
  const dragActivationThreshold = 8;
  const shouldUseTwoFullCardsLayout =
    shouldUseThreeCardLayout && !shouldUseFixedCardWidths;

  const handlePreviousSlide = useCallback(() => {
    if (isPreviousSlideDisabled) return;

    setHasManualInteraction(true);
    setHasCarouselMoved(true);
    setShouldAnimateTrack(true);
    setTrackDuration(settings.trackDuration);
    setSelectedIndex(Math.max(activeCarouselIndex - 1, 0));
  }, [activeCarouselIndex, isPreviousSlideDisabled, settings.trackDuration]);

  const goToNextSlide = useCallback(() => {
    if (isNextSlideDisabled) return;

    setHasCarouselMoved(true);
    setShouldAnimateTrack(true);
    setTrackDuration(settings.trackDuration);
    setSelectedIndex(Math.min(activeCarouselIndex + 1, maxSelectedIndex));
  }, [
    activeCarouselIndex,
    isNextSlideDisabled,
    maxSelectedIndex,
    settings.trackDuration,
  ]);

  const handleNextSlide = useCallback(() => {
    setHasManualInteraction(true);
    goToNextSlide();
  }, [goToNextSlide]);

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
        setIsDraggingCarousel(true);
        setHasCarouselMoved(true);
        setHasManualInteraction(true);
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
      const finalTrackX = baseTrackX + finalOffset;
      const centeredIndex = getCenterActiveIndex(finalTrackX);
      const snappedTrackX = getTrackXForActiveIndex(centeredIndex);
      const snappedCenterIndex = getCenterActiveIndex(snappedTrackX);

      isDraggingCarouselRef.current = false;
      shouldCancelCarouselClickRef.current = Math.abs(finalOffset) > 8;
      setDragOffset(0);
      setIsDraggingCarousel(false);
      setShouldAnimateTrack(true);
      setTrackDuration(settings.trackDuration);
      setSelectedIndex(snappedCenterIndex);

      window.setTimeout(() => {
        shouldCancelCarouselClickRef.current = false;
        setIsAutoplayPaused(false);
      }, 180);
    },
    [
      baseTrackX,
      getCenterActiveIndex,
      getTrackXForActiveIndex,
      settings.trackDuration,
    ],
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
    (
      event: ReactMouseEvent<HTMLDivElement>,
      cardIndex: number,
      shouldOpenLink: boolean,
    ) => {
      if (shouldCancelCarouselClickRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (shouldOpenLink) return;

      event.preventDefault();
      event.stopPropagation();
      setHasManualInteraction(true);
      setHasCarouselMoved(true);
      setShouldAnimateTrack(true);
      setTrackDuration(settings.inactiveClickDuration);
      setSelectedIndex(cardIndex);
    },
    [settings.inactiveClickDuration],
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
      hasManualInteraction ||
      !isAutoplayInViewport ||
      !isBrowserTabActive ||
      isNextSlideDisabled
    ) {
      return;
    }

    const autoplayInterval = window.setInterval(
      goToNextSlide,
      settings.autoplayInterval,
    );

    return () => window.clearInterval(autoplayInterval);
  }, [
    goToNextSlide,
    hasManualInteraction,
    isAutoplayInViewport,
    isAutoplayPaused,
    isBrowserTabActive,
    isNextSlideDisabled,
    settings.autoplayInterval,
  ]);

  useEffect(() => {
    setSelectedIndex((currentIndex) =>
      Math.min(currentIndex, maxSelectedIndex),
    );
  }, [maxSelectedIndex]);

  useEffect(() => {
    setTrackDuration(settings.trackDuration);
  }, [settings.trackDuration]);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAutoplayInViewport(entry.isIntersecting);
      },
      { threshold: settings.viewportThreshold },
    );

    sectionObserver.observe(sectionElement);

    return () => {
      sectionObserver.disconnect();
    };
  }, [sectionRef, settings.viewportThreshold]);

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
    carouselTrackRef,
    carouselViewportRef,
    handleCarouselClickCapture,
    handleCarouselPointerCancel,
    handleCarouselPointerDown,
    handleCarouselPointerLeave,
    handleCarouselPointerMove,
    handleCarouselPointerUp,
    handleNextSlide,
    handlePreviousSlide,
    hasCarouselMoved,
    isAutoplayInViewport,
    isCarouselMeasured,
    isNextSlideDisabled,
    isPreviousSlideDisabled,
    setIsAutoplayPaused,
    shouldUseFixedCardWidths,
    shouldAnimateTrack,
    shouldUseThreeCardLayout,
    shouldUseTwoFullCardsLayout,
    cardTransition: {
      duration: settings.cardResizeDuration,
      ease: TEMPLATE_CARD_WIDTH_TRANSITION.ease,
    },
    trackTransition: {
      duration: trackDuration,
      ease: TEMPLATE_TRACK_TRANSITION.ease,
    },
    trackX,
  };
}
