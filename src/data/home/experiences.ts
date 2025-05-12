import { Experiences } from "@/types/home/experiences";

const imageBasePath = "/experiences";

export const experiences: Experiences = [
  {
    company: "ALLOHOUSTON",
    url: "https://www.allohouston.fr",
    image: `${imageBasePath}/allohouston.jpeg`,
    positions: [
      {
        title: "Full Stack Developer Intern",
        description:
          "Developed applications using Meteor.js, a reactive JavaScript framework for the web.",
        date: "May. 2025 - Nov. 2025",
      },
    ],
  },
  {
    company: "Aurora",
    url: "https://aurora-com.vercel.app",
    image: `${imageBasePath}/aurora.jpeg`,
    positions: [
      {
        title: "Co-Founder & Consultant",
        description:
          "Made a website for one of our client using Framer as a No-Code tool. Co-developed the agency's website. Obtained the auto-entrepreneur status.",
        date: "Apr. 2024 - Present",
      },
    ],
  },
  {
    company: "Mindify",
    url: "https://www.mindify.fr",
    image: `${imageBasePath}/mindify.jpeg`,
    positions: [
      {
        title: "Co-Founder & CTO",
        description:
          "Coded the entire application from scratch, including the backend, frontend, web and mobile clients. Aligned the technical roadmap with the business strategy. Co-developed the business plan and the pitch deck.",
        date: "Aug. 2024 - Dec. 2024",
      },
    ],
  },
  {
    company: "SiBorg",
    url: "https://www.siborg.io",
    image: `${imageBasePath}/siborg.jpeg`,
    positions: [
      {
        title: "Full Stack Developer Intern",
        description:
          "Developed and refactored the application frontend using the decentralized backend. Co-worked on the website design. Developed a Telegram Bot from sratch to allow the clients to monetize their Telegram channels.",
        date: "Jun. 2024 - Sep. 2024",
      },
    ],
  },
  {
    company: "TrotelCoin",
    url: "https://www.trotelcoin.com",
    image: `${imageBasePath}/trotelcoin.jpeg`,
    positions: [
      {
        title: "Founder & CEO",
        description:
          "Developed the web application, and the smart contracts. Made the documentation. Designed the tokenomics. Created the brand identity. Made the business plan and the pitch deck. Managed the community. Coordinated the marketing strategy.",
        date: "Jul. 2023 - Jul. 2024",
      },
    ],
  },
];
