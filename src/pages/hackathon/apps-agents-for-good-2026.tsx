import Link from "@docusaurus/Link";
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
  applyNote:
    "Registration is now closed. The hackathon is open only to Data + AI Summit 2026 attendees.",
  registrationClosed: true,
  tagline:
    "The Databricks Apps & Agents for Good Hackathon 2026 is a multi-day competition hosted in partnership with OpenAI, bringing developers together to drive meaningful change. This year's hackathon challenges teams to build powerful agentic data apps for social impact using Lakebase, Agent Bricks, and Databricks Apps.",
  taglineSecondary:
    "The event culminates in live judging, a showcase of standout projects, and cash prizes for the most impactful and imaginative solutions. The hackathon is part of Data + AI Summit 2026 \u2014 you and every teammate must be registered for the summit to participate.",
  metaTitle:
    "Apps & Agents for Good Hackathon \u2014 Databricks Data + AI Summit 2026",
  metaDescription:
    "Databricks Apps & Agents for Good Hackathon at Data + AI Summit 2026 \u2014 schedule, resources, and how to apply.",
  setupGuideUrl: "/hackathon/free-edition-setup",
  datasetUrl:
    "https://login.databricks.com/signup?intent=SIGN_UP&destination_url=%2Fmarketplace%2Fconsumer%2Flistings%2Fed6cf259-81e7-4758-94c5-b444f8a5275a%3FshowModal%3Dtrue&utm_source=open-in-databricks&utm_medium=marketplace&utm_campaign=wanderbricks-test",
  resources: [
    {
      title: "Read the Docs",
      description: (
        <>
          <p className="m-0">
            Read the docs to learn how to set up your coding environment and
            start building your app.
          </p>
          <p className="mt-2 mb-0">
            We highly suggest reading the following pages before you start
            hacking:
          </p>
        </>
      ),
      links: [
        { label: "Start here", href: "/docs/start-here" },
        { label: "Platform overview", href: "/docs/platform-overview" },
        { label: "Databricks CLI", href: "/docs/tools/databricks-cli" },
        { label: "Agent skills", href: "/docs/tools/ai-tools/agent-skills" },
      ],
      Icon: BookOpen,
    },
    {
      title: "App with Lakebase template",
      description:
        "Scaffold a Databricks app wired up to Lakebase from this template and start hacking right away \u2014 then adapt it to fit your project.",
      links: [{ label: "View template", href: "/templates/app-with-lakebase" }],
      Icon: LayoutTemplate,
    },
    {
      title: "Ask questions",
      description:
        "Stuck? Join our hackathon Discord server to ask questions and get help!",
      links: [{ label: "Join Discord", href: "#", external: true }],
      Icon: MessageSquare,
    },
    {
      title: "Official rules",
      description:
        "Eligibility, team requirements, IP, and judging rules for the hackathon.",
      links: [
        {
          label: "Read the rules",
          href: "https://bit.ly/4d0Gj7w",
          external: true,
        },
      ],
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
        "A full day of hacking, kicking off with the opening ceremony at Marriott Marquis, San Francisco.",
    },
    {
      label: "Hacker's Corner (optional)",
      date: "June 16, 2026 \u00b7 11:00am\u20135:00pm PT",
      detail: "Open collaboration space with mentors on hand to help.",
    },
    {
      label: "Judging + awards",
      date: "June 16, 2026 \u00b7 6:00pm\u20139:00pm PT",
      detail: "Live judging, followed by the awards ceremony.",
    },
  ],
  submission:
    "Submit a Git repo and a description of your project. Be prepared to give a three-minute demo explaining the user, workflow, technical approach, and key tradeoffs.",
  submissionUrl: "https://dais-for-good-2026.devpost.com/",
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
    {
      q: "Which Databricks account should I use?",
      a: (
        <>
          Use a personal Databricks Free Edition account, not your work or
          enterprise account. Building and demoing on Free Edition keeps every
          team on the same playing field &mdash; see the{" "}
          <Link
            to="/hackathon/free-edition-setup"
            className="font-medium text-db-lava underline underline-offset-2 hover:text-db-lava-dark"
          >
            Free Edition setup guide
          </Link>{" "}
          to get set up.
        </>
      ),
    },
  ],
};

export default function AppsAgentsForGood2026Page(): ReactNode {
  return <HackathonEventPage event={event} />;
}
