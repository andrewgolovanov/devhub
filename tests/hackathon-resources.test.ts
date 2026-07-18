import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getVisibleHackathonResources,
  type HackathonEvent,
} from "@/components/hackathon/hackathon-event-page";

function eventWithResources(): HackathonEvent {
  return {
    name: "Test event",
    description: "",
    about: "",
    applyUrl: "https://example.com",
    facts: [],
    resources: [
      {
        label: "always",
        title: "Always visible",
        description: "",
        links: [],
      },
      {
        label: "gated",
        title: "Gated resource",
        description: "",
        links: [],
        showWhenAllResources: true,
      },
    ],
    timeline: [],
    submission: "",
    judgingIntro: "",
    judgingCriteria: [],
    faq: [],
  };
}

describe("getVisibleHackathonResources", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("hides gated resources when HACKATHON_SHOW_ALL_RESOURCES is unset", () => {
    vi.stubEnv("HACKATHON_SHOW_ALL_RESOURCES", undefined);
    const visible = getVisibleHackathonResources({
      event: eventWithResources(),
    });
    expect(visible.map((resource) => resource.label)).toEqual(["always"]);
  });

  it('hides gated resources for any value other than "true"', () => {
    vi.stubEnv("HACKATHON_SHOW_ALL_RESOURCES", "false");
    const visible = getVisibleHackathonResources({
      event: eventWithResources(),
    });
    expect(visible.map((resource) => resource.label)).toEqual(["always"]);
  });

  it('shows gated resources when HACKATHON_SHOW_ALL_RESOURCES is "true"', () => {
    vi.stubEnv("HACKATHON_SHOW_ALL_RESOURCES", "true");
    const visible = getVisibleHackathonResources({
      event: eventWithResources(),
    });
    expect(visible.map((resource) => resource.label)).toEqual([
      "always",
      "gated",
    ]);
  });
});
