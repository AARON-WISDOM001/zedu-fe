import type { Metadata } from "next";
import { ogImageUrl, siteUrl } from "~/lib/env-urls";
import { ArrowBtn, OutlineBtn } from "../../_components/ui/Button";
import { DynamicFooter } from "../../_components/footer/dynamic-footer";
import {
  Award,
  Code2,
  GitPullRequest,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Team Kestrel Contributors",
  description:
    "Meet Team Kestrel — the engineering and design contributors building structured learning, real-time messaging, and AI workflows for Zedu.",
  keywords: [
    "Zedu contributors",
    "Team Kestrel",
    "bootcamp contributors",
    "education platform engineering",
    "Zedu learning workspace",
  ],
  icons: {
    icon: "/TelexIcon.svg",
  },
  openGraph: {
    title: "Team Kestrel Contributors | Zedu",
    description:
      "Meet the engineers and designers of Team Kestrel contributing to the Zedu learning workspace.",
    url: siteUrl("/contributors/kestrel"),
    siteName: "Zedu",
    images: [
      {
        url: ogImageUrl("og-image-5.png"),
        width: 1200,
        height: 630,
        alt: "Team Kestrel contributors for the Zedu learning platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Kestrel Contributors | Zedu",
    description:
      "Meet the engineers and designers of Team Kestrel contributing to the Zedu learning workspace.",
    images: [ogImageUrl("og-image-5.png")],
  },
  alternates: {
    canonical: siteUrl("/contributors/kestrel"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

type TrackType = "Frontend" | "Backend" | "Product Design" | "DevOps & QA";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  track: TrackType;
  handle: string;
  bio: string;
  contributions: string[];
  commits: number;
  prsMerged: number;
  avatarGradient: string;
  isLead?: boolean;
}

const teamKestrelMembers: TeamMember[] = [
  {
    id: "kestrel-01",
    name: "Adebayo Oluwaseun",
    role: "Team Lead & Full-Stack Engineer",
    track: "Frontend",
    handle: "@seun_kestrel",
    bio: "Leading Team Kestrel architecture, real-time channel synchronization, and workspace UI polish.",
    contributions: ["Channel UI", "Centrifugo Sync", "Architecture"],
    commits: 42,
    prsMerged: 14,
    avatarGradient: "from-primary-500 to-blue-400",
    isLead: true,
  },
  {
    id: "kestrel-02",
    name: "Chidinma Okafor",
    role: "Backend Engineer (Go)",
    track: "Backend",
    handle: "@chidinma_go",
    bio: "Building scalable Gin APIs, PostgreSQL GORM queries, and Elasticsearch message indexing.",
    contributions: ["Search API", "GORM Migrations", "River Queue"],
    commits: 38,
    prsMerged: 12,
    avatarGradient: "from-secondary-500 to-tertiary-400",
    isLead: true,
  },
  {
    id: "kestrel-03",
    name: "Tunde Bakare",
    role: "Frontend Engineer (Next.js)",
    track: "Frontend",
    handle: "@tunde_dev",
    bio: "Crafting accessible Radix UI primitives, TipTap rich-text messaging extensions, and responsive layouts.",
    contributions: ["TipTap Editor", "Thread Drawer", "Accessibility"],
    commits: 31,
    prsMerged: 11,
    avatarGradient: "from-primary-400 to-secondary-500",
  },
  {
    id: "kestrel-04",
    name: "Zainab Danjuma",
    role: "Product Designer (UI/UX)",
    track: "Product Design",
    handle: "@zainab_ux",
    bio: "Designing intuitive educational workspace flows, Buzz call interfaces, and cohesive design tokens.",
    contributions: ["Design System", "Buzz Huddle UX", "User Research"],
    commits: 19,
    prsMerged: 8,
    avatarGradient: "from-alert-400 to-primary-500",
  },
  {
    id: "kestrel-05",
    name: "Emeka Nwosu",
    role: "Backend Engineer (Distributed Systems)",
    track: "Backend",
    handle: "@emeka_sys",
    bio: "Maintaining RabbitMQ workers, MinIO object storage pipelines, and Redis caching layers.",
    contributions: ["MinIO Storage", "RabbitMQ Consumers", "Redis Cache"],
    commits: 29,
    prsMerged: 10,
    avatarGradient: "from-blue-400 to-primary-500",
  },
  {
    id: "kestrel-06",
    name: "Farida Bello",
    role: "Frontend Engineer",
    track: "Frontend",
    handle: "@farida_codes",
    bio: "Implementing AI coworker chat workflows, responsive layouts, and interactive onboarding guides.",
    contributions: ["AI Coworkers", "Contributors Page", "Onboarding"],
    commits: 27,
    prsMerged: 9,
    avatarGradient: "from-tertiary-500 to-primary-400",
  },
  {
    id: "kestrel-07",
    name: "Kingsley Eze",
    role: "DevOps & QA Engineer",
    track: "DevOps & QA",
    handle: "@kingsley_ops",
    bio: "Automating Docker Compose environments, CI/CD pipelines, and end-to-end Cypress test suites.",
    contributions: ["Docker Setup", "Cypress E2E", "CI Workflows"],
    commits: 24,
    prsMerged: 9,
    avatarGradient: "from-blue-500 to-secondary-400",
  },
  {
    id: "kestrel-08",
    name: "Ngozi Ibe",
    role: "Backend Engineer",
    track: "Backend",
    handle: "@ngozi_be",
    bio: "Developing role-based access control (RBAC), organization invitations, and Agora token services.",
    contributions: ["RBAC Middleware", "Org Invites", "Agora Tokens"],
    commits: 26,
    prsMerged: 8,
    avatarGradient: "from-primary-500 to-alert-400",
  },
];

const teamStats = [
  {
    label: "Contributors",
    value: teamKestrelMembers.length,
    Icon: Users,
    iconClassName: "text-primary-500",
  },
  {
    label: "PRs Merged",
    value: teamKestrelMembers.reduce(
      (sum, member) => sum + member.prsMerged,
      0
    ),
    Icon: GitPullRequest,
    iconClassName: "text-secondary-500",
  },
  {
    label: "Total Commits",
    value: teamKestrelMembers.reduce((sum, member) => sum + member.commits, 0),
    Icon: Code2,
    iconClassName: "text-primary-500",
  },
  {
    label: "Core Tracks",
    value: 4,
    Icon: Layers,
    iconClassName: "text-tertiary-500",
  },
];

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const TeamKestrelPage = () => {
  return (
    <div className="space-y-20">
      <section className="relative isolate mt-10 flex w-full flex-col items-center gap-4 overflow-hidden px-4 py-10 text-center sm:gap-6 sm:px-8 sm:py-16 lg:gap-8 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-gradient-to-t from-blue-50/30 to-white"
        />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary-500">
          <Sparkles className="h-3.5 w-3.5" />
          BOOTCAMP COHORT • TEAM KESTREL
        </span>

        <h1 className="text-center text-2xl font-semibold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Meet the Builders Behind{" "}
          <span className="text-primary-500">Team Kestrel</span>
        </h1>

        <p className="max-w-[95%] text-xs text-neutral-600 sm:max-w-[90%] sm:text-base md:max-w-[65%] lg:max-w-[50%] lg:text-lg">
          A cross-functional engineering and design squad contributing
          structured channels, real-time messaging, and AI-assisted learning
          experiences to Zedu.
        </p>

        <div className="flex w-full max-w-md flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <ArrowBtn
            text="Explore the product"
            href="/auth/login"
            className="w-full max-w-[240px] justify-center sm:w-auto"
          />
          <OutlineBtn
            text="About Zedu"
            href="/about"
            className="w-[209px] sm:w-auto"
          />
        </div>

        <div className="mt-4 grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4">
          {teamStats.map(({ label, value, Icon, iconClassName }) => (
            <div
              key={label}
              className="rounded-xl border border-neutral-200 bg-white p-4 text-left"
            >
              <div className="flex items-center gap-2 text-neutral-500">
                <Icon className={`h-4 w-4 ${iconClassName}`} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {label}
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-neutral-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate flex w-full flex-col items-center gap-4 overflow-hidden px-4 text-center sm:gap-6 sm:px-8 lg:gap-8 lg:px-12">
        <h2 className="text-center text-xl font-semibold leading-tight text-neutral-900 sm:text-3xl md:text-4xl">
          Team Kestrel Contributors
        </h2>

        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamKestrelMembers.map((member) => (
            <article
              key={member.id}
              className="flex h-full flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 text-left transition hover:border-primary-300 hover:shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      aria-hidden="true"
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${member.avatarGradient} text-base font-bold text-white shadow-sm`}
                    >
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-semibold text-neutral-900">
                          {member.name}
                        </h3>
                        {member.isLead && (
                          <span
                            title="Team Lead"
                            className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800"
                          >
                            <Award className="mr-1 h-3 w-3" />
                            Lead
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-primary-500">
                        {member.role}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {member.handle}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600">
                    {member.track}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {member.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.contributions.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Code2 className="h-3.5 w-3.5 text-primary-500" />
                  {member.commits} commits
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-secondary-500" />
                  {member.prsMerged} PRs merged
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DynamicFooter
        text="Run Your Next Cohort Without Limits"
        description="Join thousands of educators building better learning experiences."
      />
    </div>
  );
};

export default TeamKestrelPage;
