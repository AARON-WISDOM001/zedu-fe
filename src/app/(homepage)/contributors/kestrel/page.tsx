import type { Metadata } from "next";
import { ogImageUrl, siteUrl } from "~/lib/env-urls";
import { DynamicFooter } from "../../_components/footer/dynamic-footer";
import { ExternalLink, Mail, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Team Kestrel Contributors | HNG 15 Internship",
  description:
    "Meet Team Kestrel — AI Product Engineers from the HNG 15 Internship building and shipping together on Zedu.",
  keywords: [
    "Zedu contributors",
    "Team Kestrel",
    "HNG 15 Internship",
    "AI Product Engineer",
    "Zedu learning workspace",
  ],
  icons: {
    icon: "/TelexIcon.svg",
  },
  openGraph: {
    title: "Team Kestrel Contributors | HNG 15 Internship",
    description:
      "Meet the AI Product Engineers of Team Kestrel from the HNG 15 Internship contributing to Zedu.",
    url: siteUrl("/contributors/kestrel"),
    siteName: "Zedu",
    images: [
      {
        url: ogImageUrl("og-image-5.png"),
        width: 1200,
        height: 630,
        alt: "Team Kestrel contributors from the HNG 15 Internship",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Kestrel Contributors | HNG 15 Internship",
    description:
      "Meet the AI Product Engineers of Team Kestrel from the HNG 15 Internship contributing to Zedu.",
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

interface TeamMember {
  id: string;
  name: string;
  zeduName: string;
  background: string;
  email: string;
  linkedin?: string;
  avatarGradient: string;
}

const teamKestrelMembers: TeamMember[] = [
  {
    id: "kestrel-01",
    name: "Jeff Yankson",
    zeduName: "jeff yankson",
    background: "Backend Developer",
    email: "jjyankson19@gmail.com",
    avatarGradient: "from-primary-500 to-blue-400",
  },
  {
    id: "kestrel-02",
    name: "Collins Odogwu",
    zeduName: "Collins Odogwu",
    background: "Data Analysis",
    email: "collinsodogwu642@gmail.com",
    linkedin: "collins-odogwu303",
    avatarGradient: "from-secondary-500 to-tertiary-400",
  },
  {
    id: "kestrel-03",
    name: "Owonifari Ajibola",
    zeduName: "Global",
    background: "Quality Assurance Engineer / Tester",
    email: "ajibolaowonifari@gmail.com",
    linkedin: "ajibola-owonifari",
    avatarGradient: "from-primary-400 to-secondary-500",
  },
  {
    id: "kestrel-04",
    name: "Ruth Nnamani",
    zeduName: "TechBaby",
    background: "Project Manager / Virtual Assistant",
    email: "eruby4453@gmail.com",
    linkedin: "ruth7135",
    avatarGradient: "from-alert-400 to-primary-500",
  },
  {
    id: "kestrel-05",
    name: "Faith Okon",
    zeduName: "Design Sensei",
    background: "UI/UX & AI Developer",
    email: "Faithokon007@gmail.com",
    avatarGradient: "from-blue-400 to-primary-500",
  },
  {
    id: "kestrel-06",
    name: "Otega Otite",
    zeduName: "otega_otite",
    background: "Full-Stack Developer",
    email: "otiteotega@gmail.com",
    avatarGradient: "from-tertiary-500 to-primary-400",
  },
  {
    id: "kestrel-07",
    name: "Ihejirika Blessing Onyinyechukwu",
    zeduName: "Onyinyechukwu",
    background: "Backend Developer",
    email: "onyinyechukwumblessing@gmail.com",
    avatarGradient: "from-blue-500 to-secondary-400",
  },
  {
    id: "kestrel-08",
    name: "Oparaocha Ogochukwu Mercy",
    zeduName: "Ogos",
    background: "Frontend Engineering",
    email: "oparaochaogochukwumercy@gmail.com",
    linkedin: "ogochukwu-oparaocha",
    avatarGradient: "from-primary-500 to-alert-400",
  },
  {
    id: "kestrel-09",
    name: "Adeniran Isreal Kehinde",
    zeduName: "Kenny Gee",
    background: "Graphics Designer",
    email: "kennygee908@gmail.com",
    avatarGradient: "from-secondary-500 to-primary-400",
  },
  {
    id: "kestrel-10",
    name: "Basit Olarewaju Salaudeen",
    zeduName: "BASIT",
    background: "Virtual Assistant",
    email: "Salaudeenbasit521@gmail.com",
    avatarGradient: "from-primary-500 to-secondary-400",
  },
  {
    id: "kestrel-11",
    name: "Ochuba Daniel Ifeanyi",
    zeduName: "Daniel Ifeanyi",
    background: "Software Engineering",
    email: "danielifeanyi74@gmail.com",
    linkedin: "daniel-ifeanyi-b33931325",
    avatarGradient: "from-blue-500 to-primary-400",
  },
  {
    id: "kestrel-12",
    name: "Silvia Ojekere",
    zeduName: "Silvia",
    background: "Customer Support",
    email: "silviaooje@gmail.com",
    linkedin: "silviaoje",
    avatarGradient: "from-tertiary-500 to-secondary-400",
  },
  {
    id: "kestrel-13",
    name: "Aaron Wisdom",
    zeduName: "Barondev",
    background: "Software Engineering",
    email: "aaronwisdom43@gmail.com",
    linkedin: "aaron-wisdom",
    avatarGradient: "from-primary-400 to-blue-500",
  },
  {
    id: "kestrel-14",
    name: "Afolabi Abdulbasit Opeyemi",
    zeduName: "Aphoe",
    background: "Web Developer",
    email: "abdulbasitafolabi7@gmail.com",
    linkedin: "afolabi-abdulbasit-604784275",
    avatarGradient: "from-primary-500 to-blue-400",
  },
  {
    id: "kestrel-15",
    name: "Hamzat Ridwan Oladipupo",
    zeduName: "ridwan hamzat",
    background: "Frontend Developer",
    email: "ridwanhamzat99@gmail.com",
    avatarGradient: "from-secondary-500 to-primary-400",
  },
  {
    id: "kestrel-16",
    name: "Divyanshi Pathak",
    zeduName: "divyanshi pathak",
    background: "Full-Stack Developer",
    email: "divyanshipathakqc@mpgi.edu.in",
    linkedin: "divyanshi-pathak-profile",
    avatarGradient: "from-alert-400 to-primary-500",
  },
  {
    id: "kestrel-17",
    name: "Freda Onyinyechi Agha",
    zeduName: "aghafreda",
    background: "Product Management",
    email: "aghafreda@gmail.com",
    linkedin: "freda-agha-0ab54b230",
    avatarGradient: "from-tertiary-500 to-primary-400",
  },
  {
    id: "kestrel-18",
    name: "Liberty Joseph",
    zeduName: "Mrwayne",
    background: "Software Engineer",
    email: "Wayneliberty33@gmail.com",
    linkedin: "liberty-wayne-787081440",
    avatarGradient: "from-blue-500 to-secondary-400",
  },
  {
    id: "kestrel-19",
    name: "Michael Samuel Oche",
    zeduName: "samstar",
    background: "Backend Development",
    email: "michaelsamstar@gmail.com",
    linkedin: "samuel-michael-0a2a47383",
    avatarGradient: "from-primary-500 to-alert-400",
  },
  {
    id: "kestrel-092",
    name: "Fabian Chibuike Muoghalu",
    zeduName: "Fabbenco",
    background: "Backend / Full-Stack / AI Developer",
    email: "fabbenco97@gmail.com",
    linkedin: "fabian-muoghalu-37aa7a1a9",
    avatarGradient: "from-secondary-500 to-tertiary-400",
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
    <div className="space-y-16">
      <section className="relative isolate mt-10 flex w-full flex-col items-center gap-4 overflow-hidden px-4 py-10 text-center sm:gap-5 sm:px-8 sm:py-14 lg:px-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary-500">
          <Sparkles className="h-3.5 w-3.5" />
          HNG 15 INTERNSHIP • TEAM KESTREL
        </span>

        <h1 className="text-center text-2xl font-semibold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Meet <span className="text-primary-500">Team Kestrel</span>
        </h1>

        <p className="max-w-[95%] text-xs text-neutral-600 sm:max-w-[85%] sm:text-base md:max-w-[60%]">
          AI Product Engineers in the{" "}
          <span className="font-semibold text-primary-500">
            HNG 15 Internship
          </span>{" "}
          with diverse backgrounds building and contributing to zedu.
        </p>
      </section>

      <section className="relative isolate flex w-full flex-col items-center px-4 sm:px-8 lg:px-12">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamKestrelMembers.map((member) => (
            <article
              key={member.id}
              className="flex h-full flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 text-left transition hover:border-primary-300 hover:shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${member.avatarGradient} text-base font-bold text-white shadow-sm`}
                >
                  {getInitials(member.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold text-neutral-900">
                    {member.name}
                  </h2>
                  <p className="text-xs font-medium text-primary-500">
                    AI Product Engineer
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">
                    Background:{" "}
                    <span className="font-medium text-neutral-800">
                      {member.background}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Zedu:{" "}
                    <span className="font-medium">@{member.zeduName}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-3.5 text-xs text-neutral-600">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1.5 truncate text-neutral-600 transition hover:text-primary-500"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary-500" />
                  <span className="truncate">{member.email}</span>
                </a>

                {member.linkedin && (
                  <a
                    href={`//www.linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 font-medium text-primary-500 transition hover:underline"
                  >
                    LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <DynamicFooter
        text="Start Building Structured Learning Today"
        description="Create organized channels, manage cohorts, and streamline your learning environment."
      />
    </div>
  );
};

export default TeamKestrelPage;
