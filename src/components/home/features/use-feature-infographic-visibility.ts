"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

const FEATURE_INFOGRAPHIC_IN_VIEW_AMOUNT = 0.45;

export function useFeatureInfographicVisibility() {
  const infographicRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(infographicRef, {
    once: true,
    amount: FEATURE_INFOGRAPHIC_IN_VIEW_AMOUNT,
    margin: "0px",
  });
  const reduceMotion = useReducedMotion() ?? false;

  return {
    infographicRef,
    isVisible: reduceMotion || isInView,
    reduceMotion,
  };
}
