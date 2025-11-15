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
    "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatarUrl: "/ME.jpg",
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
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/stealth.png",
      start: "November 2025",
      end: "till now",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
    {
      company: "Walkins",
      badges: [],
      href: "https://shopify.com",
      location: "Remote",
      title: "Social Media Manager and Web Dev Intern",
      logoUrl: "/walkins.jpg",
      start: "June 2025",
      end: "till now",
      description:
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
    },
    {
      company: "Cupertino Focus",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/cf.jpeg",
      start: "January 2024",
      end: "May 2024",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
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
