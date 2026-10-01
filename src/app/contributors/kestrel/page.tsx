"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Code2,
  Cpu,
  GitPullRequest,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

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

const TEAM_KESTREL_MEMBERS: TeamMember[] = [
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
    bio: "Crafting accessible Radix UI primitives, TipTap rich-text messaging extensions, and dark mode support.",
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

const TRACK_FILTERS: Array<"All" | TrackType> = [
  "All",
  "Frontend",
  "Backend",
  "Product Design",
  "DevOps & QA",
];

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function TeamKestrelPage() {
  const [selectedTrack, setSelectedTrack] = useState<"All" | TrackType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return TEAM_KESTREL_MEMBERS.filter((member) => {
      const matchesTrack =
        selectedTrack === "All" || member.track === selectedTrack;
      const matchesSearch =
        normalizedQuery === "" ||
        member.name.toLowerCase().includes(normalizedQuery) ||
        member.role.toLowerCase().includes(normalizedQuery) ||
        member.handle.toLowerCase().includes(normalizedQuery) ||
        member.contributions.some((item) =>
          item.toLowerCase().includes(normalizedQuery)
        );
      return matchesTrack && matchesSearch;
    });
  }, [selectedTrack, searchQuery]);

  const totalCommits = useMemo(
    () => TEAM_KESTREL_MEMBERS.reduce((sum, member) => sum + member.commits, 0),
    []
  );

  const totalPRs = useMemo(
    () =>
      TEAM_KESTREL_MEMBERS.reduce((sum, member) => sum + member.prsMerged, 0),
    []
  );

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero Banner */}
      <section className="relative overflow-clip border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/20"
        />

        <div className="container relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-primary-400"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Zedu</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary-500 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
              <Sparkles className="h-3.5 w-3.5" />
              BOOTCAMP COHORT • TEAM KESTREL
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Meet{" "}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Team Kestrel
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              We are a cross-functional engineering and design squad building
              seamless real-time collaboration, intelligent search, and
              educational workspace experiences for Zedu.
            </p>
          </div>

          {/* Stats Summary Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <Users className="h-4 w-4 text-primary-500" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Contributors
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {TEAM_KESTREL_MEMBERS.length}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <GitPullRequest className="h-4 w-4 text-secondary-500" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  PRs Merged
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalPRs}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <Code2 className="h-4 w-4 text-primary-400" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Total Commits
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalCommits}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <Layers className="h-4 w-4 text-tertiary-500" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Core Tracks
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {TRACK_FILTERS.length - 1}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Contributors Grid Section */}
      <section className="container mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Track Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter team members by track"
            className="flex flex-wrap items-center gap-2"
          >
            {TRACK_FILTERS.map((track) => {
              const isActive = selectedTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedTrack(track)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary-500 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  {track}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, role, or skill..."
              aria-label="Search team members"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <Cpu className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
              No matching team members found
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try clearing your search filter or selecting a different track.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedTrack("All");
                setSearchQuery("");
              }}
              className="mt-4 inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-400"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <article
                key={member.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-500/50"
              >
                <div>
                  {/* Card Top Row */}
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
                          <h2 className="text-base font-bold text-slate-900 dark:text-white">
                            {member.name}
                          </h2>
                          {member.isLead && (
                            <span
                              title="Team Lead"
                              className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                            >
                              <Award className="mr-1 h-3 w-3" />
                              Lead
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-primary-500 dark:text-primary-300">
                          {member.role}
                        </p>
                        <p className="text-xs text-slate-400">
                          {member.handle}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
                      {member.track}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {member.bio}
                  </p>

                  {/* Contribution Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.contributions.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-500 dark:bg-primary-500/10 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Metrics */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
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
        )}
      </section>
    </main>
  );
}
