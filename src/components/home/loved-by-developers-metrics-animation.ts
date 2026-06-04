type LovedTimelineLayerName =
  | "lines"
  | "scan"
  | "checker"
  | "bars"
  | "glow"
  | "solid";

type LovedMetricsSettings = {
  look: "original" | "cipher" | "crt" | "terminal";
  dropCurve: "linear" | "ease-out" | "ease-in-out" | "soft-spring" | "custom";
  duration: number;
  stagger: number;
  startValue: number;
  initialValueOpacity: number;
  printLines: number;
  valueSteps: number;
  linesStart: number;
  linesEnd: number;
  scanStart: number;
  scanEnd: number;
  checkerStart: number;
  checkerEnd: number;
  barsStart: number;
  barsEnd: number;
  glowStart: number;
  glowEnd: number;
  solidStart: number;
  solidEnd: number;
  linesEnabled: boolean;
  scanEnabled: boolean;
  checkerEnabled: boolean;
  barsEnabled: boolean;
  glowEnabled: boolean;
  solidEnabled: boolean;
  revealDirection: -1 | 1;
  ghostDirection: -1 | 1;
  driftDirection: -1 | 1;
  lineOn: number;
  lineGap: number;
  dotSize: number;
  dotOpacity: number;
  headOpacity: number;
  glow: number;
  startScale: number;
  rise: number;
  metricsDrop: number;
  dropDuration: number;
  dropStagger: number;
  dropCurveX1: number;
  dropCurveY1: number;
  dropCurveX2: number;
  dropCurveY2: number;
  layerSpread: number;
  layerOpacity: number;
  ghostLag: number;
  ghostOpacity: number;
  ghostBandTop: number;
  ghostBandBottom: number;
  settleSteps: number;
  cursorWidth: number;
  cursorStep: number;
  cursorOpacity: number;
};

type LovedDropCurve = LovedMetricsSettings["dropCurve"];

type LovedLayerStartKey = `${LovedTimelineLayerName}Start`;
type LovedLayerEndKey = `${LovedTimelineLayerName}End`;
type LovedLayerEnabledKey = `${LovedTimelineLayerName}Enabled`;

const LOVED_METRICS_APPROACH_ROOT_MARGIN = "0px";
const LOVED_METRICS_REVEAL_THRESHOLD = 0.45;

const LOVED_DROP_CURVE_PRESETS: Record<
  Exclude<LovedDropCurve, "custom">,
  {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }
> = {
  linear: { x1: 0, x2: 100, y1: 0, y2: 100 },
  "ease-out": { x1: 16, x2: 30, y1: 100, y2: 100 },
  "ease-in-out": { x1: 65, x2: 35, y1: 0, y2: 100 },
  "soft-spring": { x1: 18, x2: 46, y1: 95, y2: 100 },
};

export const DEFAULT_LOVED_METRICS_SETTINGS: LovedMetricsSettings = {
  look: "original",
  dropCurve: "custom",
  duration: 1800,
  stagger: 320,
  startValue: 75,
  initialValueOpacity: 40,
  printLines: 4,
  valueSteps: 24,
  linesStart: 0,
  linesEnd: 18,
  scanStart: 13,
  scanEnd: 36,
  checkerStart: 0,
  checkerEnd: 49,
  barsStart: 25,
  barsEnd: 100,
  glowStart: 64,
  glowEnd: 86,
  solidStart: 33,
  solidEnd: 100,
  linesEnabled: true,
  scanEnabled: true,
  checkerEnabled: false,
  barsEnabled: true,
  glowEnabled: false,
  solidEnabled: true,
  revealDirection: 1,
  ghostDirection: -1,
  driftDirection: 1,
  lineOn: 1,
  lineGap: 2,
  dotSize: 3,
  dotOpacity: 100,
  headOpacity: 14,
  glow: 15,
  startScale: 100,
  rise: 0,
  metricsDrop: 0,
  dropDuration: 1600,
  dropStagger: 120,
  dropCurveX1: 43,
  dropCurveY1: 0,
  dropCurveX2: 0,
  dropCurveY2: 100,
  layerSpread: 5,
  layerOpacity: 83,
  ghostLag: 0,
  ghostOpacity: 100,
  ghostBandTop: 45,
  ghostBandBottom: 45,
  settleSteps: 2,
  cursorWidth: 16,
  cursorStep: 64,
  cursorOpacity: 92,
};

export const LOVED_TIMELINE_LAYERS: Array<{
  name: LovedTimelineLayerName;
  label: string;
  color: string;
  stack: number;
  offset: number;
  height: number;
}> = [
  {
    name: "lines",
    label: "Lines",
    color: "rgba(247, 250, 249, 0.68)",
    stack: 1,
    offset: 13,
    height: 8,
  },
  {
    name: "scan",
    label: "Scan",
    color: "rgba(166, 230, 221, 0.74)",
    stack: 2,
    offset: 8,
    height: 10,
  },
  {
    name: "checker",
    label: "Checker",
    color: "rgba(115, 214, 198, 0.76)",
    stack: 3,
    offset: 3,
    height: 11,
  },
  {
    name: "bars",
    label: "Bars",
    color: "rgba(229, 244, 241, 0.78)",
    stack: 4,
    offset: -2,
    height: 12,
  },
  {
    name: "glow",
    label: "Glow",
    color: "rgba(180, 255, 236, 0.82)",
    stack: 5,
    offset: -7,
    height: 13,
  },
  {
    name: "solid",
    label: "Solid",
    color: "rgba(255, 255, 255, 0.98)",
    stack: 6,
    offset: -12,
    height: 14,
  },
];

type LovedMetricsRevealOptions = {
  section: HTMLElement;
  settings?: LovedMetricsSettings;
};

export function formatMetricValue(target: number, prefix = "", suffix = "") {
  return `${prefix}${Math.round(target).toLocaleString("en-US")}${suffix}`;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function getMetricStartValue(target: number, startValuePercent: number) {
  return target * (clampPercent(startValuePercent) / 100);
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

function easeOutQuart(value: number) {
  return 1 - (1 - value) ** 4;
}

function layerRamp(density: number, from: number, to: number) {
  if (to <= from) return 0;
  return clamp01((density - from) / (to - from));
}

function getLayerStart(
  settings: LovedMetricsSettings,
  name: LovedTimelineLayerName,
) {
  return clampPercent(Number(settings[`${name}Start` as LovedLayerStartKey]));
}

function getLayerEnd(
  settings: LovedMetricsSettings,
  name: LovedTimelineLayerName,
) {
  return clampPercent(Number(settings[`${name}End` as LovedLayerEndKey]));
}

function isLayerEnabled(
  settings: LovedMetricsSettings,
  name: LovedTimelineLayerName,
) {
  return Boolean(settings[`${name}Enabled` as LovedLayerEnabledKey]);
}

function getLovedLayerTimeline(settings: LovedMetricsSettings) {
  return LOVED_TIMELINE_LAYERS.map(({ name }) => {
    const rawStart = getLayerStart(settings, name);
    const rawEnd = getLayerEnd(settings, name);

    return {
      start: Math.min(rawStart, rawEnd) / 100,
      end: Math.max(rawStart, rawEnd) / 100,
    };
  });
}

function getEnabledLayerIntervals(settings: LovedMetricsSettings) {
  return getLovedLayerTimeline(settings)
    .map((range, index) => ({
      ...range,
      enabled: isLayerEnabled(settings, LOVED_TIMELINE_LAYERS[index].name),
    }))
    .filter((range) => range.enabled && range.end > range.start)
    .sort((a, b) => a.start - b.start)
    .reduce<Array<{ start: number; end: number }>>((merged, range) => {
      const previous = merged[merged.length - 1];

      if (!previous || range.start > previous.end) {
        merged.push({ start: range.start, end: range.end });
      } else {
        previous.end = Math.max(previous.end, range.end);
      }

      return merged;
    }, []);
}

function getActiveTimelineProgress(
  progress: number,
  settings: LovedMetricsSettings,
) {
  const intervals = getEnabledLayerIntervals(settings);

  if (!intervals.length) return progress;

  const total = intervals.reduce(
    (sum, range) => sum + range.end - range.start,
    0,
  );
  if (total <= 0) return progress;

  let completed = 0;

  for (const range of intervals) {
    if (progress < range.start) return clamp01(completed / total);
    if (progress <= range.end) {
      return clamp01((completed + progress - range.start) / total);
    }
    completed += range.end - range.start;
  }

  return 1;
}

function getDropCurveControlPoints(settings: LovedMetricsSettings) {
  if (settings.dropCurve !== "custom") {
    return LOVED_DROP_CURVE_PRESETS[settings.dropCurve];
  }

  return {
    x1: clampPercent(settings.dropCurveX1),
    x2: clampPercent(settings.dropCurveX2),
    y1: clampPercent(settings.dropCurveY1),
    y2: clampPercent(settings.dropCurveY2),
  };
}

function getCubicBezierCoordinate(t: number, first: number, second: number) {
  const inverse = 1 - t;

  return (
    3 * inverse * inverse * t * first + 3 * inverse * t * t * second + t * t * t
  );
}

function getCubicBezierProgress(
  progress: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const targetX = clamp01(progress);
  let lower = 0;
  let upper = 1;
  let t = targetX;

  for (let index = 0; index < 18; index += 1) {
    const x = getCubicBezierCoordinate(t, x1, x2);

    if (Math.abs(x - targetX) < 0.0005) break;

    if (x < targetX) {
      lower = t;
    } else {
      upper = t;
    }

    t = (lower + upper) / 2;
  }

  return clamp01(getCubicBezierCoordinate(t, y1, y2));
}

function getMetricsDropProgress(
  elapsed: number,
  settings: LovedMetricsSettings,
) {
  if (settings.dropDuration <= 0) return 1;

  const rawProgress = clamp01(elapsed / settings.dropDuration);
  const curve = getDropCurveControlPoints(settings);

  return getCubicBezierProgress(
    rawProgress,
    curve.x1 / 100,
    curve.y1 / 100,
    curve.x2 / 100,
    curve.y2 / 100,
  );
}

function getLayerMaskInset(progress: number, direction: -1 | 1) {
  const reveal = clamp01(progress) * 100;

  return {
    bottom: direction < 0 ? 0 : 100 - reveal,
    top: direction < 0 ? 100 - reveal : 0,
  };
}

function applyMetricText(node: HTMLElement, text: string, ghostText = "") {
  node.dataset.display = text;
  node.dataset.ghostDisplay = ghostText;
  node
    .querySelectorAll<HTMLElement>("[data-loved-metric-text]")
    .forEach((textNode) => {
      textNode.textContent =
        textNode.dataset.lovedMetricLayer === "glow" && ghostText
          ? ghostText
          : text;
    });
}

function applyValueLayers(
  node: HTMLElement,
  progress: number,
  settings: LovedMetricsSettings,
  timeline: Array<{ start: number; end: number }>,
  printLines: number,
) {
  LOVED_TIMELINE_LAYERS.forEach((layer, index) => {
    const range = timeline[index];
    const enabled = isLayerEnabled(settings, layer.name) ? 1 : 0;
    const layerProgress = layerRamp(progress, range.start, range.end) * enabled;
    const maskedProgress =
      printLines > 0
        ? Math.min(1, Math.ceil(layerProgress * printLines) / printLines)
        : layerProgress;
    const maskInset = getLayerMaskInset(
      maskedProgress,
      settings.revealDirection,
    );

    node.style.setProperty(`--layer-${layer.name}`, String(enabled));
    node.style.setProperty(
      `--layer-${layer.name}-clip-top`,
      `${maskInset.top.toFixed(2)}%`,
    );
    node.style.setProperty(
      `--layer-${layer.name}-clip-bottom`,
      `${maskInset.bottom.toFixed(2)}%`,
    );
  });
}

function resetMetricNode(
  node: HTMLElement,
  settings: LovedMetricsSettings,
  timeline: Array<{ start: number; end: number }>,
  printLines: number,
) {
  node.classList.remove(
    "is-currency",
    "is-prepping",
    "is-printing",
    "is-settling",
    "effect-original",
    "effect-cipher",
    "effect-crt",
    "effect-terminal",
  );
  node.style.animation = "none";
  node.offsetHeight;
  node.style.removeProperty("animation");
  node.classList.add("is-printing", `effect-${settings.look}`);
  node.classList.toggle("is-currency", node.dataset.prefix === "$");
  node.classList.add("is-prepping");
  node.classList.remove("is-settling");
  node.style.setProperty("--line-on", `${settings.lineOn}px`);
  node.style.setProperty("--line-gap", `${settings.lineGap}px`);
  node.style.setProperty("--tile-size", `${settings.dotSize}px`);
  node.style.setProperty(
    "--matrix-cell",
    `${Math.max(4, Math.round(settings.dotSize * 0.54))}px`,
  );
  node.style.setProperty("--matrix-glow", `${settings.glow + 4}px`);
  node.style.setProperty("--checker-opacity", `${settings.dotOpacity / 100}`);
  node.style.setProperty("--head-opacity", `${settings.headOpacity / 100}`);
  node.style.setProperty(
    "--initial-value-opacity",
    `${settings.initialValueOpacity / 100}`,
  );
  node.style.setProperty("--glow", `${settings.glow}px`);
  node.style.setProperty("--start-scale", `${settings.startScale / 100}`);
  node.style.setProperty("--start-y", `${settings.rise}px`);
  node.style.setProperty("--layer-spread", `${settings.layerSpread}px`);
  node.style.setProperty("--layer-opacity", `${settings.layerOpacity / 100}`);
  node.style.setProperty("--ghost-opacity", `${settings.ghostOpacity / 100}`);
  node.style.setProperty("--ghost-band-top", `${settings.ghostBandTop}%`);
  node.style.setProperty("--ghost-band-bottom", `${settings.ghostBandBottom}%`);
  node.style.setProperty(
    "--settle-steps",
    String(Math.max(1, settings.settleSteps)),
  );
  node.style.setProperty("--cursor-width", `${settings.cursorWidth / 100}em`);
  node.style.setProperty("--cursor-step", `${settings.cursorStep / 100}em`);
  node.style.setProperty("--cursor-opacity", `${settings.cursorOpacity / 100}`);
  node.style.setProperty(
    "--solid-position",
    settings.revealDirection < 0 ? "100%" : "0%",
  );
  node.style.setProperty("--drift-direction", String(settings.driftDirection));
  node.style.setProperty("--cursor-cols", "0");
  node.style.setProperty("--effect-alpha", "1");
  node.style.setProperty("--final-alpha", "0");
  node.style.setProperty("--lines-reveal", "0%");
  node.style.setProperty("--scan-reveal", "0%");
  node.style.setProperty("--bars-reveal", "0%");
  node.style.setProperty("--solid-reveal", "0%");
  node.style.setProperty("--scan-drift", "0px");
  node.style.setProperty("--ghost-drift", "0px");
  node.style.setProperty("--ghost-scan", "112%");
  const target = Number(node.dataset.target ?? 0);
  const prefix = node.dataset.prefix ?? "";
  const suffix = node.dataset.suffix ?? "";
  const startValue = getMetricStartValue(target, settings.startValue);

  applyMetricText(node, formatMetricValue(startValue, prefix, suffix));
  applyValueLayers(node, 0, settings, timeline, printLines);
}

function finishMetricNode(node: HTMLElement) {
  node.classList.add("is-settling");
  node.style.setProperty("--effect-alpha", "0");
  node.style.setProperty("--final-alpha", "1");
  node.style.setProperty("--scan-drift", "0px");
  node.style.setProperty("--ghost-drift", "0px");
  node.style.setProperty("--ghost-scan", "112%");
}

export function setupLovedMetricsReveal({
  section,
  settings = DEFAULT_LOVED_METRICS_SETTINGS,
}: LovedMetricsRevealOptions) {
  const valueNodes = Array.from(
    section.querySelectorAll<HTMLElement>("[data-loved-metric-value]"),
  );
  const metricsListNodes = Array.from(
    section.querySelectorAll<HTMLElement>("[data-loved-metrics-list]"),
  );
  const metricsLineNodes = Array.from(
    section.querySelectorAll<HTMLElement>("[data-loved-metrics-line-drop]"),
  );
  const metricFrameIds = new Map<HTMLElement, number>();
  const metricRunIds = new Map<HTMLElement, number>();
  const revealedNodes = new Set<HTMLElement>();
  const timeline = getLovedLayerTimeline(settings);
  const printLines = Math.max(1, settings.printLines);
  const numericEffect = settings.look !== "terminal";
  const duration = Math.max(settings.duration, 1);
  const metricsDrop = Math.max(0, settings.metricsDrop);
  const dropDuration = Math.max(settings.dropDuration, 0);
  const dropStagger = Math.max(settings.dropStagger, 0);
  const dropSequenceCount = Math.max(
    metricsListNodes.length,
    metricsLineNodes.length,
    1,
  );
  const sectionMotionDuration =
    dropDuration + dropStagger * (dropSequenceCount - 1);
  let observer: IntersectionObserver | undefined;
  let sectionFrameId = 0;
  let sectionRunId = 0;
  let hasSectionMotionStarted = false;

  const startSectionMotion = () => {
    if (hasSectionMotionStarted) return;

    hasSectionMotionStarted = true;
    sectionRunId += 1;
    const currentRun = sectionRunId;
    const start = performance.now();

    metricsListNodes.forEach((node) => {
      node.style.transform = `translateY(-${metricsDrop}px)`;
    });
    metricsLineNodes.forEach((node) => {
      node.style.height = `calc(100% - ${metricsDrop}px)`;
    });

    if (sectionMotionDuration <= 0) {
      metricsListNodes.forEach((node) => {
        node.style.transform = "translateY(0px)";
      });
      metricsLineNodes.forEach((node) => {
        node.style.height = "100%";
      });
      return;
    }

    const tick = (time: number) => {
      if (currentRun !== sectionRunId) return;

      const elapsed = Math.max(time - start, 0);
      const getMetricsDropOffset = (index: number) => {
        const delayedElapsed = elapsed - index * dropStagger;

        if (delayedElapsed <= 0) return metricsDrop;

        return (
          metricsDrop * (1 - getMetricsDropProgress(delayedElapsed, settings))
        );
      };

      metricsListNodes.forEach((node, index) => {
        const metricsDropOffset = getMetricsDropOffset(index);

        node.style.transform = `translateY(-${metricsDropOffset.toFixed(2)}px)`;
      });
      metricsLineNodes.forEach((node, index) => {
        const metricsDropOffset = getMetricsDropOffset(index);

        node.style.height = `calc(100% - ${metricsDropOffset.toFixed(2)}px)`;
      });

      if (elapsed < sectionMotionDuration) {
        sectionFrameId = window.requestAnimationFrame(tick);
        return;
      }

      metricsListNodes.forEach((node) => {
        node.style.transform = "translateY(0px)";
      });
      metricsLineNodes.forEach((node) => {
        node.style.height = "100%";
      });
    };

    sectionFrameId = window.requestAnimationFrame(tick);
  };

  const updateMetricNode = (node: HTMLElement, localProgress: number) => {
    node.classList.remove("is-prepping");

    const target = Number(node.dataset.target ?? 0);
    const prefix = node.dataset.prefix ?? "";
    const suffix = node.dataset.suffix ?? "";
    const finalText = formatMetricValue(target, prefix, suffix);
    const startValue = getMetricStartValue(target, settings.startValue);

    if (!numericEffect) {
      const startChars = Math.floor(
        finalText.length * (settings.startValue / 100),
      );
      const visibleChars = Math.min(
        finalText.length,
        startChars +
          Math.floor(
            easeOutCubic(localProgress) * (finalText.length - startChars + 1),
          ),
      );
      const ghostChars = Math.min(
        finalText.length,
        startChars +
          Math.floor(
            easeOutCubic(Math.max(localProgress - 0.08, 0)) *
              (finalText.length - startChars + 1),
          ),
      );
      const nextText = finalText.slice(0, visibleChars) || "\u00a0";
      const ghostText =
        finalText.slice(0, ghostChars) || node.dataset.display || "";

      applyMetricText(node, nextText, ghostText === nextText ? "" : ghostText);
      node.style.setProperty("--final-cols", String(finalText.length));
      node.style.setProperty("--cursor-cols", String(visibleChars));
      return;
    }

    const activeProgress = getActiveTimelineProgress(localProgress, settings);
    const steppedProgress =
      settings.valueSteps > 0
        ? Math.min(
            1,
            Math.ceil(activeProgress * settings.valueSteps) /
              settings.valueSteps,
          )
        : activeProgress;
    const ghostSteppedProgress =
      settings.valueSteps > 0
        ? Math.min(
            1,
            Math.ceil(
              Math.max(activeProgress - settings.ghostLag / 100, 0) *
                settings.valueSteps,
            ) / settings.valueSteps,
          )
        : Math.max(activeProgress - settings.ghostLag / 100, 0);
    const eased =
      settings.valueSteps > 0
        ? easeOutQuart(steppedProgress)
        : easeOutCubic(activeProgress);
    const value =
      activeProgress > 0.9
        ? target
        : Math.min(target, startValue + (target - startValue) * eased);
    const ghostProgress = Math.max(activeProgress - settings.ghostLag / 100, 0);
    const ghostEase =
      settings.look === "cipher"
        ? Math.min(
            1,
            (settings.valueSteps > 0
              ? easeOutQuart(ghostSteppedProgress)
              : easeOutCubic(ghostProgress)) +
              Math.sin(localProgress * Math.PI * 4) * 0.018,
          )
        : settings.valueSteps > 0
          ? easeOutQuart(ghostSteppedProgress)
          : easeOutCubic(ghostProgress);
    const nextText = formatMetricValue(value, prefix, suffix);
    const ghostText = formatMetricValue(
      startValue + (target - startValue) * ghostEase,
      prefix,
      suffix,
    );
    const scanBase =
      settings.look === "crt" ? 122 : settings.look === "cipher" ? 168 : 145;
    const scanOffset = settings.look === "cipher" ? -14 : -6;
    const scanLocal = layerRamp(
      localProgress,
      timeline[1].start,
      timeline[1].end,
    );
    const glowLocal = layerRamp(
      localProgress,
      timeline[4].start,
      timeline[4].end,
    );
    const rawGhostScan = ((glowLocal * scanBase) % 112) + scanOffset;
    const ghostScan = Math.round(
      settings.ghostDirection < 0 ? 112 - rawGhostScan : rawGhostScan,
    );

    applyMetricText(node, nextText, ghostText === nextText ? "" : ghostText);
    applyValueLayers(node, localProgress, settings, timeline, printLines);
    node.style.setProperty("--ghost-scan", `${ghostScan}%`);
    node.style.setProperty(
      "--scan-drift",
      `${(Math.sin(scanLocal * Math.PI * 4) * settings.layerSpread * 0.22 * settings.driftDirection).toFixed(2)}px`,
    );
    node.style.setProperty(
      "--ghost-drift",
      `${(Math.sin(glowLocal * Math.PI * 5) * settings.layerSpread * 0.34 * settings.driftDirection).toFixed(2)}px`,
    );
  };

  const animateMetricNode = (node: HTMLElement) => {
    const previousFrameId = metricFrameIds.get(node);

    if (previousFrameId) {
      window.cancelAnimationFrame(previousFrameId);
    }

    const currentRun = (metricRunIds.get(node) ?? 0) + 1;
    const start = performance.now();

    metricRunIds.set(node, currentRun);
    resetMetricNode(node, settings, timeline, printLines);

    const tick = (time: number) => {
      if (metricRunIds.get(node) !== currentRun) return;

      const elapsed = Math.max(time - start, 0);
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);

      updateMetricNode(node, progress);

      if (elapsed < duration) {
        metricFrameIds.set(node, window.requestAnimationFrame(tick));
        return;
      }

      finishMetricNode(node);
      metricFrameIds.delete(node);
    };

    metricFrameIds.set(node, window.requestAnimationFrame(tick));
  };

  const startReveal = (node: HTMLElement) => {
    if (revealedNodes.has(node)) return;

    revealedNodes.add(node);
    startSectionMotion();
    animateMetricNode(node);
  };

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.intersectionRatio < LOVED_METRICS_REVEAL_THRESHOLD) return;
        if (!(entry.target instanceof HTMLElement)) return;

        startReveal(entry.target);
        observer?.unobserve(entry.target);
      });
    },
    {
      rootMargin: LOVED_METRICS_APPROACH_ROOT_MARGIN,
      threshold: LOVED_METRICS_REVEAL_THRESHOLD,
    },
  );

  valueNodes.forEach((node) => {
    observer?.observe(node);
  });

  return () => {
    observer?.disconnect();
    window.cancelAnimationFrame(sectionFrameId);
    sectionRunId += 1;
    metricFrameIds.forEach((frameId) => {
      window.cancelAnimationFrame(frameId);
    });
    metricRunIds.forEach((runId, node) => {
      metricRunIds.set(node, runId + 1);
    });
  };
}
