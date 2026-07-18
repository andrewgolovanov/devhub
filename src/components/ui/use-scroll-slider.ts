import { useEffect, useRef, useState, type UIEvent } from "react";

function getNearestSliderItemIndex(track: HTMLDivElement): number {
  const items = Array.from(track.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const trackCenter = track.scrollLeft + track.clientWidth / 2;

  return items.reduce((nearestIndex, item, index) => {
    const currentItem = items[nearestIndex];
    const itemCenter =
      item.offsetLeft - track.offsetLeft + item.offsetWidth / 2;
    const currentItemCenter =
      currentItem.offsetLeft - track.offsetLeft + currentItem.offsetWidth / 2;

    return Math.abs(itemCenter - trackCenter) <
      Math.abs(currentItemCenter - trackCenter)
      ? index
      : nearestIndex;
  }, 0);
}

export function useScrollSlider({ itemCount }: { itemCount: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const targetIndexRef = useRef<number | null>(null);
  const lastIndex = Math.max(0, itemCount - 1);
  const currentIndex = targetIndex ?? activeIndex;

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  function settleProgrammaticScroll(track: HTMLDivElement) {
    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      const settledTargetIndex = targetIndexRef.current;
      targetIndexRef.current = null;
      setActiveIndex(settledTargetIndex ?? getNearestSliderItemIndex(track));
      setTargetIndex(null);
    }, 140);
  }

  function scrollToIndex(index: number) {
    const nextIndex = Math.max(0, Math.min(index, lastIndex));
    const track = trackRef.current;
    const item = trackRef.current?.children.item(nextIndex);

    if (!track || !(item instanceof HTMLElement)) {
      setActiveIndex(nextIndex);
      setTargetIndex(null);
      targetIndexRef.current = null;
      return;
    }

    const trackStyles = window.getComputedStyle(track);
    const trackLeftInset = Number.parseFloat(trackStyles.paddingLeft) || 0;

    targetIndexRef.current = nextIndex;
    setTargetIndex(nextIndex);

    track.scrollTo({
      left: Math.min(
        Math.max(0, item.offsetLeft - track.offsetLeft - trackLeftInset),
        track.scrollWidth - track.clientWidth,
      ),
      behavior: "smooth",
    });
    settleProgrammaticScroll(track);
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;

    if (targetIndexRef.current !== null) {
      settleProgrammaticScroll(track);
      return;
    }

    const nextIndex = getNearestSliderItemIndex(track);

    setActiveIndex((index) => (nextIndex === index ? index : nextIndex));
  }

  return {
    activeIndex,
    currentIndex,
    handleScroll,
    lastIndex,
    scrollToIndex,
    trackRef,
  };
}
