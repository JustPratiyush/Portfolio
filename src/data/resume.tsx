import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Abhinav Kuchhal",
  initials: "AK",
  url: "https://dillion.io",
  location: "Uttarakhand, RK",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software Engineer. I love building things and helping people. Very active on Twitter.",
  summary:
    "A 21-year-old software engineer with a deep fascination for neuroscience and how the brain works. I began my journey into web development at the end of 2024.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "abhinavkuchhal7@gmail.com",
    tel: "+917417399438",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/JustPratiyush",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abhinav-kuchhal/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/JustPratiyush",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@JustPratiyush",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Stealth Startup",
      href: "",
      badges: [],
      location: "Remote",
      title: "Independent Researcher",
      logoUrl: "/stealth.png",
      start: "November 2025",
      end: "till now",
      description:
        "Exploring a potential startup concept through independent research, problem discovery, and early MVP ideation",
    },
    {
      company: "Walkins",
      badges: [],
      href: "hpttps://walkins.net/",
      location: "Remote",
      title: "Social Media Manager and Web Dev Intern",
      logoUrl: "/walkins.jpg",
      start: "June 2025",
      end: "till now",
      description:
        "Working at a modern social media startup where I manage the company's online presence and contribute to web development initiatives. My role includes enhancing digital outreach, improving website functionality, and supporting brand growth across multiple platforms.",
    },
    {
      company: "Cupertino Focus",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Co-Founder",
      logoUrl: "/cf.jpeg",
      start: "January 2024",
      end: "May 2024",
      description:
        "4 Friends of us started an agency with the vision of providing",
    },
  ],
  education: [
    {
      school: "Manipal University Jaipur",
      href: "https://jaipur.manipal.edu/",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      logoUrl: "/manipal.png",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "Retro OS",
      href: "https://os-retro.vercel.app",
      dates: "Augest 2025 - November 2025",
      active: true,
      description:
        "I built a fun, interactive Operating System inside the Browser inspired by classic Mac OS with a fully functional desktop environment",
      technologies: ["Javascript", "HTML", "CSS"],
      links: [
        {
          type: "Website",
          href: "https://os-retro.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/JustPratiyush/RetroOS",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/retro-os.png",
      video: "",
    },
    {
      title: "Flappy Bird AI",
      href: "https://ai-flappy-bird.vercel.app/",
      dates: "November 2025",
      active: true,
      description:
        "Flappy Bird game with a self-learning AI that learns to play the game using a Genetic Algorithm and Neural Networks.",
      technologies: ["Javascript"],
      links: [
        {
          type: "Website",
          href: "https://ai-flappy-bird.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/flappy-bird.png",
      video: "",
    },
  ],
} as const;
