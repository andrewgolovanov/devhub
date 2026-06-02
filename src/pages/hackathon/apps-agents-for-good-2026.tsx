import {
  BookOpen,
  FileText,
  LayoutTemplate,
  MessageSquare,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  HackathonEventPage,
  type HackathonEvent,
} from "@/components/hackathon/hackathon-event-page";

/**
 * Apps & Agents for Good Hackathon at Data + AI Summit 2026.
 *
 * Served at `/hackathon/apps-agents-for-good-2026`. Content is hardcoded here so
 * it can be edited without touching other events or shared schema. To stand up a
 * new event, copy this file to a new slug and edit the data (or render a fully
 * custom layout instead of `HackathonEventPage`).
 */

const event: HackathonEvent = {
  name: "Apps & Agents for Good Hackathon",
  eyebrow: "Data + AI Summit",
  dates: "June 15 \u2013 June 16, 2026",
  location: "Marriott Marquis, San Francisco",
  partner: "OpenAI",
  applyUrl:
    "https://events.mlh.com/events/13878-databricks-apps-agents-hackathon-for-good",
  applyLabel: "Apply on MLH",
  applyNote: (
    <>
      Applications close Sunday, May 31, 2026 &middot; 11:59pm PT. Apply in
      teams of 2&ndash;4 &mdash; every teammate must be registered for Data + AI
      Summit 2026.
    </>
  ),
  tagline:
    "The Databricks Apps & Agents for Good Hackathon 2026 is a multi-day competition hosted in partnership with OpenAI, bringing developers together to drive meaningful change. This year's hackathon challenges teams to build powerful agentic data apps for social impact using Lakebase, Agent Bricks, and Databricks Apps.",
  taglineSecondary:
    "The event culminates in live judging, a showcase of standout projects, and cash prizes for the most impactful and imaginative solutions. The hackathon is part of Data + AI Summit 2026 \u2014 you and every teammate must be registered for the summit to participate.",
  metaTitle:
    "Apps & Agents for Good Hackathon \u2014 Databricks Data + AI Summit 2026",
  metaDescription:
    "Databricks Apps & Agents for Good Hackathon at Data + AI Summit 2026 \u2014 schedule, resources, and how to apply.",
  resources: [
    {
      title: "Get started",
      description: (
        <>
          <p className="m-0">
            Read the docs to learn how to set up your coding environment and
            start building your app.
          </p>
          <p className="mt-2 mb-1">
            We suggest reading the following pages before you start hacking:
          </p>
          <ul className="m-0 list-disc pl-5">
            <li>
              <strong className="font-semibold text-black dark:text-white">
                Start here
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-black dark:text-white">
                Platform overview
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-black dark:text-white">
                Set up your environment
              </strong>
            </li>
          </ul>
        </>
      ),
      href: "/docs/start-here",
      Icon: BookOpen,
    },
    {
      title: "App with Lakebase template",
      description:
        "Scaffold a Databricks app wired up to Lakebase from this template and start hacking right away \u2014 then adapt it to fit your project.",
      href: "/templates/app-with-lakebase",
      Icon: LayoutTemplate,
    },
    {
      title: "Ask questions",
      description:
        "Stuck? Join our hackathon Discord server to ask questions and get help!",
      href: "#",
      external: true,
      Icon: MessageSquare,
    },
    {
      title: "Official rules",
      description:
        "Eligibility, team requirements, IP, and judging rules for the hackathon.",
      href: "#",
      external: true,
      Icon: FileText,
    },
  ],
  timeline: [
    {
      label: "Applications close",
      date: "May 31, 2026 \u00b7 11:59pm PT",
      detail: "Apply on MLH in teams of 2\u20134.",
    },
    {
      label: "Opening + hacking begins",
      date: "June 15, 2026 \u00b7 8:00am\u20134:00pm PT",
      detail:
        "Opening ceremony and kickoff at Marriott Marquis, San Francisco.",
    },
    {
      label: "Hacker's Corner (optional)",
      date: "June 16, 2026 \u00b7 11:00am\u20135:00pm PT",
      detail: "Open collaboration space.",
    },
    {
      label: "Judging + awards",
      date: "June 16, 2026 \u00b7 6:00pm\u20139:00pm PT",
      detail: "Live judging, followed by the awards ceremony.",
    },
    {
      label: "Winners showcase",
      date: "June 17, 2026",
      detail:
        "Winning teams and selected projects presented at Hacker's Corner for Data + AI Summit attendees.",
    },
  ],
  submission:
    "Submit a Git repo and a live Databricks App. Be prepared to give a three-minute demo explaining the user, workflow, technical approach, and key tradeoffs.",
  judgingIntro: "Submissions will be judged on four dimensions:",
  judgingCriteria: [
    {
      title: "Product judgment",
      detail: "Is the user clear? Are the workflow and tradeoffs thoughtful?",
    },
    {
      title: "Evidence and uncertainty",
      detail:
        "Are outputs grounded in citations? Is uncertainty handled honestly?",
    },
    {
      title: "Technical execution",
      detail:
        "Does the app work reliably in a live demo? Are Databricks capabilities used well?",
    },
    {
      title: "Ambition",
      detail:
        "Did the team go beyond the minimum workflow in a meaningful way?",
    },
  ],
  faq: [
    {
      q: "Do I need to be registered for Data + AI Summit 2026?",
      a: "Yes. The hackathon is part of Data + AI Summit 2026, and every participant \u2014 including all teammates \u2014 must be registered for the summit to take part.",
    },
    {
      q: "When do applications close?",
      a: "Sunday, May 31, 2026 at 11:59pm PT. Apply through the MLH event page; if you've applied, hold off on booking Monday activities in the DAIS attendee portal until you hear back.",
    },
    {
      q: "Where is the hackathon?",
      a: "In-person only at the Marriott Marquis in San Francisco, alongside Data + AI Summit 2026.",
    },
    {
      q: "How big can my team be?",
      a: "Teams of 2 to 4 people. Every teammate must also be registered for Data + AI Summit 2026.",
    },
    {
      q: "What if I'm new to Databricks?",
      a: 'Start with the "Start here" docs and copy one of the templates as a prompt for your coding agent \u2014 it will scaffold a working app and walk you through the rest.',
    },
  ],
};

export default function AppsAgentsForGood2026Page(): ReactNode {
  return <HackathonEventPage event={event} />;
}
